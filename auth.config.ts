import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDP = nextUrl.pathname.startsWith('/dp');
      // console.log({LoggedIn: isLoggedIn, OnDP: isOnDP})
      if (isOnDP) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } 
      return true;
    },
  }
} satisfies NextAuthConfig;