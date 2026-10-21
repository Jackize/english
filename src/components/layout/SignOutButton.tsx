"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-xs font-medium text-muted transition-colors hover:text-brand"
    >
      Đăng xuất
    </button>
  );
}
