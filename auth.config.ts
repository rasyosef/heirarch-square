import type { NextAuthConfig } from 'next-auth';
import "urlpattern-polyfill";
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDpAdd = nextUrl.pathname.startsWith('/dp/add');

      const editPattern = new URLPattern({ pathname: "/dp/:id/edit" })
      const isOnDpEdit = editPattern.test(nextUrl.href);

      if (isOnDpAdd || isOnDpEdit) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      return true;
    },
  }
} satisfies NextAuthConfig;