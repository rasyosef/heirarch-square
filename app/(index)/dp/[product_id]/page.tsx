import { auth } from "@/auth";
import { AddToCartButton, DeleteProductButton } from "@/components/CartButtons";
import { getProductCreatorEmail, getSingleProduct } from "@/lib/data"
import Image from "next/image"
import { notFound } from "next/navigation";

export default async function Detail({ params }: { params: Promise<{ product_id: number }> }) {
    const { product_id } = await params;
    const product = await getSingleProduct(product_id)

    if (!product) {
        notFound()
    }

    const prod_creator_email = await getProductCreatorEmail(Number(product_id))
    const session = await auth();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 py-4">
            <Image
                src={product.image_url}
                alt={product.name}
                width={1024}
                height={1024}
                className="col-span-1"
            />

            <div className="col-span-1 sm:col-span-2 flex flex-col gap-4">
                <h1 className="text-xl font-medium">{product.name}</h1>
                <p className="text-md font-light">
                    {product.description}
                </p>
            </div>

            <div className="col-span-1 sm:col-span-1 flex flex-col gap-8">
                <div className='flex flex-col'>
                    <span className='text-sm font-medium uppercase'>Price</span>
                    <span className='text-xl font-semibold'>${product.price}</span>
                </div>
                <div className="flex flex-col gap-4">
                    <AddToCartButton product_id={product.id} />
                    {
                        session?.user?.email === prod_creator_email &&
                        <DeleteProductButton product_id={product.id} />
                    }
                </div>
            </div>
        </div>
    )
}