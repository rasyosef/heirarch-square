import { cookies } from "next/headers";
import { prisma } from '@/lib/prisma';
import { CartItem } from "@/lib/definitions";

export async function getItemsInCartFromCookie(): Promise<CartItem[]> {
  const cookieStore = await cookies()

  const cartItemsCookie = cookieStore.get('cart_items')
  const cartItems = JSON.parse(cartItemsCookie?.value || JSON.stringify({}))

  const cart_products = Object.keys(cartItems).map(async (id: string) => {
    const productId = Number(id);
    const itemCount = cartItems[productId]

    const product = await prisma.product.findFirst({
      where: {
        id: productId
      }
    })

    const item: CartItem = {
      id: productId,
      count: itemCount,
      name: product?.name || 'product not found',
      description: product?.description || 'This product is out of stock.',
      image_url: product?.image_url || '/not-found.jpg',
      price: (product?.price || 0) * itemCount
    }

    return item;
  })

  const cartItemsList = await Promise.all(cart_products);
  return cartItemsList;
}

export async function getCartItemsCountCookie(): Promise<number> {
  const cookieStore = await cookies()

  const cartItemsCookie = cookieStore.get('cart_items')
  const cartItems = JSON.parse(cartItemsCookie?.value || JSON.stringify({}))

  const itemCounts: number[] = Object.values(cartItems)
  const numItems: number = itemCounts.reduce((total, val) => (total + val), 0);

  return numItems;
}
