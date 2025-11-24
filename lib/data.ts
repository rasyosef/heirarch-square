import postgres from 'postgres';
import { CartItem, Product } from "./definitions"

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});

export async function getProducts (): Promise<Product[]>{
    const products_list = await sql<Product[]>`SELECT * FROM heirarch_products;`;
    return products_list
}

export async function getSingleProduct(id: number): Promise<Product>{
    const product = await sql<Product[]>`SELECT * FROM heirarch_products WHERE id=${id};`;
    return product[0]
}

export async function getBestSellers (): Promise<Product[]>{
    const best_sellers = await sql<Product[]>`
        SELECT 
            heirarch_products.* 
        FROM heirarch_products
        JOIN heirarch_sale_data
        ON heirarch_products.id = heirarch_sale_data.product_id
        ORDER BY heirarch_sale_data.num_sold DESC;
    `;
    return best_sellers
}

export async function searchProducts(query: string): Promise<Product[]>{
    const products_list = await getProducts();
    const term_list = query.toLowerCase().split(/\s+/)

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

    search_results.sort((a, b) => b.matches - a.matches)
    return search_results.filter(x => x.matches > 0).map(x => x.product);
}

export async function getItemsInCart(): Promise<CartItem[]>{
    const cart_products = await sql<CartItem[]>`
        SELECT 
            heirarch_products.*,
            heirarch_cart.id as cart_item_id
        FROM heirarch_products
        JOIN heirarch_cart
        ON heirarch_products.id = heirarch_cart.product_id
        ORDER BY heirarch_cart.id;
    `;
    return cart_products
}