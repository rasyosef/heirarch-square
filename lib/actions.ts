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
