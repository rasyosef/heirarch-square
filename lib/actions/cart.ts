'use server';

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addToCartCookie(product_id: number){
    const cookieStore = await cookies()

    const cartItemsCookie = cookieStore.get('cart_items')
    const cart_items: {[key: number]: number} = JSON.parse(cartItemsCookie?.value || JSON.stringify({}))

    if (Object.keys(cart_items).length === 0){
      cart_items[0] = product_id
    } else {
      const max_key = Object.keys(cart_items).reduce((a, b) => Number(a) > Number(b) ? a : b);
      cart_items[Number(max_key) + 1] = product_id
    }

    cookieStore.set(
      'cart_items', 
      JSON.stringify(cart_items), 
      {
        path: "/", // The cookie is available across the entire site
        maxAge: 60 * 60 * 24 * 15, // 15 day duration
        httpOnly: true, // Recommended for security
        secure: true, // Ensures cookie is sent only over HTTPS
        sameSite: 'strict', // Controls cross-origin requests behavior
      }
    )

    revalidatePath("/")
}

export async function removeFromCartCookie(cart_item_idx: number, product_id: number){
    const cookieStore = await cookies()

    const cartItemsCookie = cookieStore.get('cart_items')
    const cart_items: number[] = JSON.parse(cartItemsCookie?.value || JSON.stringify({}))

    if (cart_item_idx in cart_items && cart_items[cart_item_idx] === product_id){
      delete cart_items[cart_item_idx]
    }

    cookieStore.set(
      'cart_items', 
      JSON.stringify(cart_items), 
      {
        path: "/", // The cookie is available across the entire site
        maxAge: 60 * 60 * 24 * 15, // 15 day duration
        httpOnly: true, // Recommended for security
        secure: true, // Ensures cookie is sent only over HTTPS
        sameSite: 'strict', // Controls cross-origin requests behavior
      }
    )
    revalidatePath("/")
}
