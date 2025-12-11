'use server';

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";
import { ProductAddSchema, ProductEditSchema } from "@/lib/actions/schema";

export async function addProduct(
  prevState: any,
  formData: FormData,
) {
  const session = await auth()
  let new_product_id: number;

  const validatedData = ProductAddSchema.safeParse({
    name: formData.get("name"),
    image: formData.get("image"),
    description: formData.get("description"),
    price: formData.get("price")
  })

  if (!validatedData.success) {
    return {
      values: {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: formData.get("price") as string
      },
      errors: validatedData.error.flatten().fieldErrors,
      message: "Invalid input"
    }
  }

  const { name, image, description, price } = validatedData.data;

  try {

    const { url } = await put(image?.name, image, { access: 'public', addRandomSuffix: true, });

    const product = await prisma.product.create({
      data: {
        name: name,
        description: description,
        image_url: url,
        price: price
      }
    })

    if (session?.user?.email) {
      await prisma.productCreatedBy.create({
        data: {
          product_id: product.id,
          created_by_email: session.user.email
        }
      })
    }

    new_product_id = product.id;
  }
  catch (error) {
    // console.log(error)
    return {
      values: {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: formData.get("price") as string
      },
      errors: null,
      message: "Error occured"
    }
  }

  revalidatePath(`/dp/${new_product_id}`)
  redirect(`/dp/${new_product_id}`)
}


export async function editProduct(
  product_id: number,
  prevState: any,
  formData: FormData,
) {

  const validatedData = ProductEditSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price")
  })


  if (!validatedData.success) {
    return {
      values: {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: formData.get("price") as string
      },
      errors: validatedData.error.flatten().fieldErrors,
      message: "Invalid input"
    }
  }

  const { name, description, price } = validatedData.data;

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
  catch (error) {
    // console.log(error)
    return {
      values: {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: formData.get("price") as string
      },
      errors: null,
      message: "Error occured"
    }
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
