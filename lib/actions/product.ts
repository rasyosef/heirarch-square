'use server';

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";

export async function addProduct(
  prevState: string | undefined, 
  formData: FormData,
){
  const session = await auth()
  let new_product_id : number;

  try{
    const name = formData.get("name") as string;
    const image = formData.get("image") as File;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));

    const { url } = await put(image?.name, image, { access: 'public', addRandomSuffix: true, });
    
    const product = await prisma.product.create({
        data: {
          name: name,
          description: description,
          image_url: url,
          price: price
        }
      })
      
    if (session?.user?.email){
      await prisma.productCreatedBy.create({
        data: {
          product_id: product.id,
          created_by_email: session.user.email
        }
      })
    }

    new_product_id = product.id;
  }
  catch (error){
    console.log(error)
    return "Error occured"
  }

  revalidatePath(`/dp/${new_product_id}`)
  redirect(`/dp/${new_product_id}`)
}


export async function editProduct(
  product_id: number,
  prevState: string | undefined, 
  formData: FormData,
){

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));

  try {
    const product = await prisma.product.update({
        data: {
          name: name,
          description: description,
          price: price
        },
        where: {
          id: product_id
        }
      })
  }
  catch (error){
    console.log(error)
    return "Error occured"
  }

  revalidatePath(`/dp/${product_id}`)
  redirect(`/dp/${product_id}`)
}

export async function deleteProduct(product_id: number) {
  await prisma.$transaction(async (tx) => {
    // delete product
    await tx.product.delete({
          where: {
              id: product_id
          }
      })
    
    // delete it from all carts
    await tx.cartItem.deleteMany({
          where: {
              product_id: product_id
          }
      })

    // delete product from bestsellers
    await tx.saleData.deleteMany({
          where: {
              product_id: product_id
          }
      })

    // delete product from creators table
    await tx.productCreatedBy.deleteMany({
          where: {
              product_id: product_id
          }
      })
  })

  revalidatePath("/") 
  redirect('/')
}
