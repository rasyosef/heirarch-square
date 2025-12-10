'use server';

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { UserSchema } from "./schema";

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
          return 'Invalid credentials!';
        default:
          return 'Something went wrong!';
      }
    }
    throw error;
  }
}

export async function createUser(
  prevState: any,
  formData: FormData,
) {

  const validatedCredentials = UserSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  })

  if (!validatedCredentials.success) {
    return {
      errors: validatedCredentials.error.flatten().fieldErrors,
      message: "Invalid Email or Password!"
    }
  }

  const { email, password } = validatedCredentials.data;
  const userExists = await prisma.user.count({ where: { email: email } })

  if (userExists) {
    return {
      errors: null,
      message: "An account already exists with this email!"
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        email: email,
        passwordHash: hashedPassword
      }
    })

  } catch (error) {
    return {
      errors: null,
      message: "Something went wrong!"
    }
  }

  redirect('/login')
}

export async function signOutUser() {
  await signOut({ redirect: false });
  redirect('/');
}
