import { auth } from "@/auth";
import {
  AddToCartButton, DeleteProductButton, EditProductButton
} from "@/components/CartButtons";
import { getProductCreatorEmail, getSingleProduct } from "@/lib/data/productData"
import Image from "next/image"
import { notFound } from "next/navigation";
import z from "zod";

export default async function Detail({ params }: { params: Promise<{ product_id: number }> }) {
  const myparams = await params;

  const validation = z.object({
    product_id: z.coerce.number().min(0)
  }).safeParse(myparams);

  if (!validation.success) {
    notFound()
  }

  const { product_id } = validation.data;
  const product = await getSingleProduct(product_id)

  if (!product) {
    notFound()
  }

  const prod_creator_email = await getProductCreatorEmail(Number(product_id))
  const session = await auth();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 p-4">
      <Image
        src={product.image_url}
        alt={product.name}
        width={1024}
        height={1024}
        className="col-span-1 sm:col-span-2"
      />

      <div className="col-span-1 sm:col-span-3 flex flex-col gap-4 px-4">
        <h1 className="text-xl font-medium">{product.name}</h1>
        <p className="text-md font-light">
          {product.description}
        </p>
      </div>

      <div className="col-span-1 sm:col-span-1 flex flex-col gap-8 w-full items-center">
        <div className='flex flex-col'>
          <span className='text-md font-medium uppercase'>Price</span>
          <span className='text-2xl font-medium'>${product.price}</span>
        </div>
        <div className="flex flex-col gap-4">
          <AddToCartButton product_id={product.id} />
          {session && session?.user?.email === prod_creator_email &&
            <EditProductButton product_id={product.id} />}
          {session && session?.user?.email === prod_creator_email &&
            <DeleteProductButton product_id={product.id} />
          }
        </div>
      </div>
    </div>
  )
}