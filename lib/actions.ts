'use server';

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";


export async function addToCart(product_id: number){
    await prisma.cartItem.create({
        data: {
            product_id: product_id,
        },
    })
    revalidatePath("/")
}

export async function removeFromCart(cart_item_id: number){
    await prisma.cartItem.delete({
        where: {
            cart_item_id: cart_item_id
        }
    })
    revalidatePath("/")
}

export async function authenticateUser(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // console.log(formData);
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function createUser(
  prevState: string | undefined, 
  formData: FormData,
) {

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        email: email,
        passwordHash: hashedPassword
      }
    })
  } catch (error){
    return "Something went wrong"
  }

  redirect('/login')
}

export async function  signOutUser() {
  await signOut({ redirect: false });
  redirect('/');
}

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
    const max_id: number = await prisma.product.findFirst({
      select: {
        id: true
      },
      orderBy: {
        id: 'desc'
      }
    }).then((res) => res?.id || 1)
    
    const product = await prisma.product.create({
        data: {
          id: max_id +1,
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
