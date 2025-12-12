'use server';

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addToCartCookie(product_id: number) {
  const cookieStore = await cookies()

  const cartItemsCookie = cookieStore.get('cart_items')
  const cart_items: { [key: number]: number } = JSON.parse(cartItemsCookie?.value || JSON.stringify({}))

  if (!(product_id in cart_items)) {
    cart_items[product_id] = 1;
  } else {
    cart_items[product_id] += 1;
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

export async function removeFromCartCookie(product_id: number) {
  const cookieStore = await cookies()

  const cartItemsCookie = cookieStore.get('cart_items')
  const cart_items = JSON.parse(cartItemsCookie?.value || JSON.stringify({}))

  if (product_id in cart_items) {
    if (cart_items[product_id] <= 1) {
      delete cart_items[product_id];
    } else {
      cart_items[product_id] -= 1;
    }
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
