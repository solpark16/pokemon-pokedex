import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "./provider";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokédex",
  description: "1세대의 포켓몬들을 보여주는 도감 페이지입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <h1 className="p-8 text-center text-7xl	font-bold">
          <span className="text-red-600">P</span>okédex
        </h1>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
