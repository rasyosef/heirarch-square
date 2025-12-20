import { auth } from "@/auth";
import EditProductForm from "@/components/forms/EditProductForm";
import { getProductCreatorEmail, getSingleProduct } from "@/lib/data/productData";
import Image from "next/image";
import { notFound } from "next/navigation";
import z from "zod";

export default async function EditProduct({ params }: { params: Promise<{ product_id: number }> }) {
  const myparams = await params;
  const validation = z.object({
    product_id: z.coerce.number().min(0)
  }).safeParse(myparams);

  if (!validation.success) {
    notFound()
  }

  const { product_id } = validation.data;
  const product_created_by = await getProductCreatorEmail(Number(product_id));
  const session = await auth();

  if (!session || session?.user?.email !== product_created_by) {
    notFound()
  }

  const product = await getSingleProduct(product_id)

  return (
    <div className="flex justify-center px-4 py-4">
      <div className="w-full max-w-md rounded-md">
        <Image
          src={product.image_url}
          alt={product.name}
          width={1024}
          height={1024}
          className="pb-4 rounded-md"
        />
        <div className="py-4">
          <h1 className="text-lg font-medium">Edit Product</h1>
          <p className="text-sm">Edit the details of your product</p>
        </div>
        <div>
          <EditProductForm product={product} />
        </div>
      </div>
    </div>
  )
}