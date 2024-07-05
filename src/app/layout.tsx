import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "./provider";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokédex",
  description: "현재까지 나온 모든 포켓몬들을 보여주는 도감 페이지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="min-w-[1100px] max-w-[1400px] mx-auto p-8 text-center text-7xl	font-bold">
          <h2>
            <span className="text-red-600">P</span>okédex
          </h2>
        </header>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
