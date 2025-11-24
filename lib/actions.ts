'use server';

import { revalidatePath } from "next/cache";
import { CartItem, Product } from "./definitions";
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});


export async function addToCart(product_id: number){
    await sql`INSERT INTO heirarch_cart(product_id) VALUES(${product_id})`
    revalidatePath("/")
}

export async function removeFromCart(cart_item_id: number){
    await sql`DELETE FROM heirarch_cart WHERE id=${cart_item_id}`
    revalidatePath("/")
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