import { cookies } from "next/headers";
import { CartItem, Product } from "./definitions"
import { prisma } from './prisma';
import { revalidatePath } from "next/cache";

export async function getProducts (): Promise<Product[]>{
    const products_list = await prisma.product.findMany();
    return products_list
}

export async function getSingleProduct(id: number): Promise<Product>{
    const product = await prisma.product.findMany({
        where: {
            id: Number(id),
        }
    });
    return product[0];
}

export async function getBestSellers (): Promise<Product[]>{
    const best_sellers = await prisma.$queryRaw<Product[]>`
        SELECT 
            "Product".* 
        FROM "Product"
        JOIN "SaleData"
        ON "Product".id = "SaleData".product_id
        ORDER BY "SaleData".num_sold DESC;
    `;
    return best_sellers
}

export async function searchProducts(query: string): Promise<Product[]>{
    const products_list = await getProducts();
    const term_list = query.toLowerCase().trim().split(/\s+/);

    function containsTerms(text: string, terms: string[]): number{
        let matches = 0;
        for (let i=0; i<terms.length; i++)
            matches = matches + Number(terms[i]!=='' && text.includes(terms[i]))
        return matches;
    }

    const search_results = products_list.map(prod => (
        {
            product: prod,
            matches: containsTerms(
                prod.name.toLowerCase() + " " + prod.description.toLowerCase(),
                term_list
            )
        }
    ))

    search_results.sort((a, b) => b.matches - a.matches);
    return search_results.filter(x => x.matches > 0).map(x => x.product);
}

export async function getItemsInCart(): Promise<CartItem[]>{
    const cart_products = await prisma.$queryRaw<CartItem[]>`
        SELECT 
            "Product".*,
            "CartItem".cart_item_id
        FROM "Product"
        JOIN "CartItem"
        ON "Product".id = "CartItem".product_id
        ORDER BY "CartItem".cart_item_id;
    `;
    return cart_products;
}

export async function getCartItemsCount(){
    const num_items = await prisma.cartItem.count();
    return num_items
}

export async function getProductCreatorEmail(product_id: number) {
    const creator_email = await prisma.productCreatedBy.findFirst({
        where: {
            product_id: product_id
        }
    }).then(res => res?.created_by_email)
    
    return creator_email;
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

// COOKIE

export async function getItemsInCartFromCookie(): Promise<CartItem[]>{
    const cookieStore = await cookies()

    const cartItemsCookie = cookieStore.get('cart_items')
    const cart_items = JSON.parse(cartItemsCookie?.value || JSON.stringify('[]'))

    const cart_products: CartItem[] = cart_items.map(async (product_id: number, idx: number) => {
        const product = await prisma.product.findFirst({
            where: {
                id: product_id
            }
        }) 

        // if (!product){
        //     return null
        // }

        const item = <CartItem>{
            cart_item_id: idx,
            id: product?.id,
            name: product?.name || 'product not found',
            description: product?.description || 'This product does not exist',
            image_url: product?.image_url || '/not-found.avif',
            price: product?.price || 0
        }

        return item;
    })

    const cart_items_list = await Promise.all(cart_products);
    return cart_items_list //.filter(item => !!item);
}

export async function getCartItemsCountCookie(){
    const cookieStore = await cookies()

    const cartItemsCookie = cookieStore.get('cart_items')
    const cart_items: number[] = JSON.parse(cartItemsCookie?.value || JSON.stringify('[]'))

    const num_items = cart_items.length;
    return num_items
}