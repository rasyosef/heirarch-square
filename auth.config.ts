import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDpAdd = nextUrl.pathname.startsWith('/dp/add');
      // console.log({LoggedIn: isLoggedIn, OnDP: isOnDP})
      if (isOnDpAdd) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } 
      return true;
    },
  }
} satisfies NextAuthConfig;