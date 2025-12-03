'use server';

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

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
