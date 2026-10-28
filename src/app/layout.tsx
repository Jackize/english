import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { getSession } from "@/lib/auth";
import { AppProviders } from "@/components/layout/AppProviders";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

const materialSymbols = localFont({
  src: "../fonts/MaterialSymbolsOutlined.ttf",
  variable: "--font-material-symbols",
  display: "swap",
  preload: true,
  weight: "400",
});

export const metadata: Metadata = {
  title: "eng-growth — Lộ trình IELTS A1 → C2",
  description:
    "Học IELTS theo từng chặng: ngữ pháp, từ vựng và đọc hiểu chia theo sáu bậc CEFR từ A1 đến C2, có bài kiểm tra và ôn lại câu sai.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${materialSymbols.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-ink">
        <AppProviders session={await getSession()}>{children}</AppProviders>
      </body>
    </html>
  );
}
