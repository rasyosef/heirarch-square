import { AddToCart } from "@/components/CartButtons";
import { getSingleProduct } from "@/lib/data"
import Image from "next/image"

export default async function Detail({ params }: { params: Promise<{ product_id: number }> }) {
    const { product_id } = await params;
    const product = await getSingleProduct(product_id)

    return (
        <div className="grid grid-cols-4 gap-4 pt-4">
            <Image
                src={product.image_url}
                alt={product.name}
                width={1024}
                height={1024}
                className="col-span-1"
            />

            <div className="col-span-2 flex flex-col gap-4">
                <h1 className="text-xl font-medium">{product.name}</h1>
                <p className="text-md font-light">
                    {product.description}
                </p>
            </div>

            <div className="col-span-1 flex flex-col gap-8">
                <div className='flex flex-col'>
                    <span className='text-sm font-medium uppercase'>Price</span>
                    <span className='text-xl font-semibold'>${product.price}</span>
                </div>
                <AddToCart product_id={product.id} />
            </div>
        </div>
    )
}