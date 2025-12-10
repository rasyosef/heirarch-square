'use server';

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";

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
