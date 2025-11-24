import { Product } from "@/lib/definitions"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { AddToCart } from "@/components/CartButtons";

export default function CardList({ products }: { products: Product[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4 pb-4">
            {
                products.map((product) => (
                    <Card key={product.id} className="justify-between gap-4">
                        <CardContent>
                            <Image src={product.image_url} alt="" width={1024} height={1024} />
                        </CardContent>
                        <CardHeader>
                            <CardTitle>
                                <Link
                                    href={`/dp/${product.id}`}
                                    className="text-primary hover:text-gray-700"
                                >{product.name}</Link>
                            </CardTitle>
                            <CardDescription>{product.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="justify-between gap-3">
                            <div className='flex flex-col'>
                                <span className='text-sm font-medium uppercase'>Price</span>
                                <span className='text-xl font-semibold'>${product.price}</span>
                            </div>
                            <AddToCart product_id={product.id} />
                        </CardFooter>
                    </Card>
                ))
            }
        </div>
    )
}