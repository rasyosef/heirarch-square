import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './lib/prisma';
import { UserSchema } from './lib/actions/schema';

async function getUser(email: string): Promise<{ email: string, passwordHash: string } | undefined> {
  try {
    const user = await prisma.user.findMany({
      where: {
        email: email
      },
      select: {
        email: true,
        passwordHash: true
      }
    })

    return user[0];
  }
  catch (error) {
    throw error;
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Credentials({
    async authorize(credentials) {
      const parsedCredentials = UserSchema.safeParse(credentials);

      if (parsedCredentials.success) {
        const { email, password } = parsedCredentials.data;
        const user = await getUser(email);
        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(password, user.passwordHash)

        if (passwordsMatch) return user;
      }

      return null;
    },
  })],
});