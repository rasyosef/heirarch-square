import { Product } from "@/lib/definitions"
import { prisma } from '@/lib/prisma';
import { redis } from "@/lib/redis";

export async function getProducts(): Promise<Product[]> {
  const productsList = await prisma.product.findMany();
  return productsList
}

export async function getSingleProduct(id: number): Promise<Product> {
  const cacheKey = `product:${id}`;
  const cachedData = await redis.get<Product>(cacheKey);

  if (cachedData) {
    return cachedData
  }

  const product = await prisma.product.findMany({
    where: {
      id: Number(id),
    }
  });

  if (product[0]) {
    await redis.set(cacheKey, product[0], { ex: 3600 });
  }

  return product[0];
}

export async function getBestSellers(): Promise<Product[]> {
  const bestSellers = await prisma.$queryRaw<Product[]>`
        SELECT 
            "Product".* 
        FROM "Product"
        JOIN "SaleData"
        ON "Product".id = "SaleData".product_id
        ORDER BY "SaleData".num_sold DESC;
    `;
  return bestSellers
}

export async function getProductCreatorEmail(product_id: number) {
  const creatorEmail = await prisma.productCreatedBy.findFirst({
    where: {
      product_id: product_id
    }
  }).then(res => res?.created_by_email)

  return creatorEmail;
}

export async function getProductsCreatedByUser(email: string): Promise<Product[]> {
  const products = await prisma.$queryRaw<Product[]>`
        SELECT 
            "Product".*
        FROM "Product"
        JOIN "ProductCreatedBy"
        ON "Product".id = "ProductCreatedBy".product_id
        WHERE "ProductCreatedBy".created_by_email = ${email}
        ORDER BY "Product".id
    `;
  return products;
}

export async function searchProducts(query: string): Promise<Product[]> {
  const productsList = await getProducts();
  const termList = query.toLowerCase().trim().split(/\s+/);

  function countMatches(text: string, terms: string[]): number {
    const matches = terms.reduce((count, term) => count + Number(text.includes(term)), 0)
    return matches;
  }

  const searchResults = productsList.map(prod => (
    {
      product: prod,
      match_count: countMatches(
        prod.name.toLowerCase() + " " + prod.description.toLowerCase(),
        termList
      )
    }
  ))

  searchResults.sort((a, b) => b.match_count - a.match_count);
  return searchResults.filter(x => x.match_count > 0).map(x => x.product);
}