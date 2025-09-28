import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Him Energy - Tương lai của Năng lượng Tái tạo",
  description: "Tiên phong trong việc phát triển các giải pháp năng lượng tái tạo bền vững và thông minh.",
  keywords: "năng lượng tái tạo, năng lượng mặt trời, năng lượng gió, Him Energy, bền vững, xanh",
  authors: [{ name: "Him Energy" }],
  openGraph: {
    title: "Him Energy - Tương lai của Năng lượng Tái tạo",
    description: "Tiên phong trong việc phát triển các giải pháp năng lượng tái tạo bền vững và thông minh.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  );
}