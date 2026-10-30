import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  // Chặn ở server, không chỉ ẩn link trên header: user thường gõ thẳng
  // /admin hoặc /admin/lessons/... đều bị đưa về trang chủ.
  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }

  return children;
}
