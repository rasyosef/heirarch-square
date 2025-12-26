import { cookies } from "next/headers";
import { prisma } from '@/lib/prisma';
import { CartItem } from "@/lib/definitions";

export async function getItemsInCartFromCookie(): Promise<CartItem[]> {
  const cookieStore = await cookies()

  const cartItemsCookie = cookieStore.get('cart_items')
  const cart_items = JSON.parse(cartItemsCookie?.value || JSON.stringify({}))

  const cart_products = Object.keys(cart_items).map(async (id: string) => {
    const product_id = Number(id);
    const item_count = cart_items[product_id]

    const product = await prisma.product.findFirst({
      where: {
        id: product_id
      }
    })

    const item: CartItem = {
      id: product_id,
      count: item_count,
      name: product?.name || 'product not found',
      description: product?.description || 'This product is out of stock.',
      image_url: product?.image_url || '/not-found.jpg',
      price: (product?.price || 0) * item_count
    }

    return item;
  })

  const cart_items_list = await Promise.all(cart_products);
  return cart_items_list
}

export async function getCartItemsCountCookie(): Promise<number> {
  const cookieStore = await cookies()

  const cartItemsCookie = cookieStore.get('cart_items')
  const cart_items = JSON.parse(cartItemsCookie?.value || JSON.stringify({}))

  const item_counts: number[] = Object.values(cart_items)
  const num_items: number = item_counts.reduce((total, val) => (total + val), 0);

  return num_items
}
