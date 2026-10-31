import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  // Tin tưởng host từ reverse proxy (Traefik) — bắt buộc khi deploy sau proxy,
  // nếu không Auth.js báo UntrustedHost cho mọi request.
  trustHost: true,
  providers: [],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = request.nextUrl;

      // /admin chỉ dành cho tài khoản có role ADMIN. Kiểm tra ở proxy (edge)
      // để user thường không vào được kể cả khi gõ thẳng URL.
      if (pathname.startsWith("/admin")) {
        return auth?.user?.role === "ADMIN";
      }

      const protectedPaths = ["/lesson", "/review", "/onboarding", "/settings"];
      const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

      if (isProtected) return isLoggedIn;
      if ((pathname === "/login" || pathname === "/register") && isLoggedIn) {
        return Response.redirect(new URL("/", request.nextUrl));
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role ?? "USER";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        session.user.role = (token.role as "USER" | "ADMIN" | undefined) ?? "USER";
      }
      return session;
    },
  },
};
