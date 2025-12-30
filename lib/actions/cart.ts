'use server';

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addToCartCookie(product_id: number) {
  const cookieStore = await cookies()

  const cartItemsCookie = cookieStore.get('cart_items')
  const cartItems: { [key: number]: number } = JSON.parse(cartItemsCookie?.value || JSON.stringify({}))

  if (!(product_id in cartItems)) {
    cartItems[product_id] = 1;
  } else {
    cartItems[product_id] += 1;
  }

  cookieStore.set(
    'cart_items',
    JSON.stringify(cartItems),
    {
      path: "/", // The cookie is available across the entire site
      maxAge: 60 * 60 * 24 * 15, // 15 day duration
      httpOnly: true, // Recommended for security
      secure: true, // Ensures cookie is sent only over HTTPS
    }
  )

  revalidatePath("/")
}

export async function removeFromCartCookie(product_id: number) {
  const cookieStore = await cookies()

  const cartItemsCookie = cookieStore.get('cart_items')
  const cartItems = JSON.parse(cartItemsCookie?.value || JSON.stringify({}))

  if (product_id in cartItems) {
    if (cartItems[product_id] <= 1) {
      delete cartItems[product_id];
    } else {
      cartItems[product_id] -= 1;
    }
  }

  cookieStore.set(
    'cart_items',
    JSON.stringify(cartItems),
    {
      path: "/", // The cookie is available across the entire site
      maxAge: 60 * 60 * 24 * 15, // 15 day duration
      httpOnly: true, // Recommended for security
      secure: true, // Ensures cookie is sent only over HTTPS
    }
  )
  revalidatePath("/")
}
