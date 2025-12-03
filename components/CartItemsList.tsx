import { CartItem } from "@/lib/definitions"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { RemoveFromCartButton } from "@/components/CartButtons";

export default function CartItemList({ cart_items }: { cart_items: CartItem[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4 pb-4">
            {
                cart_items.map((cart_item) => (
                    <Card key={cart_item.cart_item_id} className="justify-between gap-4">
                        <CardContent>
                            <Image src={cart_item.image_url} alt="" width={1024} height={1024} />
                        </CardContent>
                        <CardHeader>
                            <CardTitle>
                                <Link
                                    href={`/dp/${cart_item.id}`}
                                    className="text-primary hover:text-gray-700"
                                >{cart_item.name}</Link>
                            </CardTitle>
                            <CardDescription>{cart_item.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="justify-between gap-3">
                            <div className='flex flex-col'>
                                <span className='text-sm font-medium uppercase'>Price</span>
                                <span className='text-xl font-semibold'>${cart_item.price}</span>
                            </div>
                            <RemoveFromCartButton item_idx={cart_item.cart_item_id} />
                        </CardFooter>
                    </Card>
                ))
            }
        </div>
    )
}