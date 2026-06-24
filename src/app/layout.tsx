import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "经典电影",
  description: "浏览经典电影，发现永恒佳作",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
