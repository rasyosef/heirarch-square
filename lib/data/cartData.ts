import { cookies } from "next/headers";
import { CartItem } from "@/lib/definitions"
import { prisma } from '@/lib/prisma';

export async function getItemsInCartFromCookie(): Promise<CartItem[]> {
  const cookieStore = await cookies()

  const cartItemsCookie = cookieStore.get('cart_items')
  const cart_items = JSON.parse(cartItemsCookie?.value || JSON.stringify({}))

  const cart_products = Object.keys(cart_items).map(async (idx: string) => {
    const item_id = Number(idx);
    const product_id = cart_items[item_id]

    const product = await prisma.product.findFirst({
      where: {
        id: product_id
      }
    })

    const item = <CartItem>{
      cart_item_id: item_id,
      id: product_id,
      name: product?.name || 'product not found',
      description: product?.description || 'This product is out of stock.',
      image_url: product?.image_url || '/not-found.jpg',
      price: product?.price || 0
    }

    return item;
  })

  const cart_items_list = await Promise.all(cart_products);
  return cart_items_list
}

export async function getCartItemsCountCookie() {
  const cookieStore = await cookies()

  const cartItemsCookie = cookieStore.get('cart_items')
  const cart_items = JSON.parse(cartItemsCookie?.value || JSON.stringify({}))

  const num_items = Object.keys(cart_items).length;
  return num_items
}
