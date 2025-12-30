import { Search } from '@upstash/search';

import { Product } from '@/lib/definitions';
import { getSingleProduct, searchProducts } from '@/lib/data/productData';

const upstashClient = new Search({
  url: process.env.UPSTASH_SEARCH_REST_URL,
  token: process.env.UPSTASH_SEARCH_REST_TOKEN,
})

export const upstashIndex = upstashClient.index("heirarch-products-index")

export async function upstashSearchProducts(query: string): Promise<Product[]> {
  try {
    const searchResults = await upstashIndex.search({
      query,
      limit: 10
    });

    const matchedProducts = await Promise.all(
      searchResults.map(result => getSingleProduct(
        Number(result.id)
      ))
    )

    return matchedProducts;
  } catch {
    const searchResults = await searchProducts(query)
    return searchResults
  }
}