import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "eng-growth — Lộ trình IELTS A1 → C2",
  description:
    "Học IELTS theo từng chặng: ngữ pháp, từ vựng và đọc hiểu chia theo sáu bậc CEFR từ A1 đến C2, có bài kiểm tra và ôn lại câu sai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} h-full antialiased`}>
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-background text-ink">{children}</body>
    </html>
  );
}
