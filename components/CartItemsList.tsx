import { CartItem } from "@/lib/definitions"
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { CartButtonGroup } from "@/components/CartButtons";
import { getItemsInCartFromCookie } from "@/lib/data/cartData";

export default async function CartItemList() {
  const cart_items: CartItem[] = await getItemsInCartFromCookie()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4 pb-4">
      {
        cart_items.map((cart_item) => (
          <Card key={cart_item.id} className="justify-between gap-4 rounded-md shadow-none">
            <div className="flex flex-col gap-4">
              <CardContent className="px-4 pb-2">
                <Image
                  src={cart_item.image_url}
                  alt={cart_item.name}
                  width={1024}
                  height={1024}
                  className="aspect-15/9 object-contain"
                />
              </CardContent>
              <CardHeader>
                <CardTitle>
                  <Link
                    href={`/dp/${cart_item.id}`}
                    className="text-primary hover:text-gray-700"
                  >{cart_item.name}</Link>
                </CardTitle>
                <CardDescription className="line-clamp-3">{cart_item.description}</CardDescription>
              </CardHeader>
            </div>
            <CardFooter className="justify-between gap-3">
              <div className='flex flex-col'>
                <span className='text-sm font-medium uppercase'>Price</span>
                <span className='text-xl font-semibold'>${cart_item.price}</span>
              </div>
              <CartButtonGroup product_id={cart_item.id} product_count={cart_item.count} />
            </CardFooter>
          </Card>
        ))
      }
    </div>
  )
}