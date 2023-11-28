import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Greeting from "./_components/greeting";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hong Gil Seong",
  description: "Hong gil seong",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Greeting />
        {children}
      </body>
    </html>
  );
}
