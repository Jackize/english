import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/learn/:path*", "/review/:path*", "/admin/:path*", "/milestones/:path*", "/login", "/register"],
};
