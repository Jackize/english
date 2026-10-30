"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { ToastProvider } from "@/components/ui/Toast";

export function AppProviders({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <SessionProvider session={session}>
      <ToastProvider>{children}</ToastProvider>
    </SessionProvider>
  );
}
