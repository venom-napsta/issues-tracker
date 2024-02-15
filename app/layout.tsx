import "./globals.css";
import "./theme-config.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./Navbar";
import Footer from "./Footer";

import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Next.JS Issue Tracker .TSX",
  description: "Next.js App for tracking issues and bugs, created by qxd",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Theme accentColor="teal" radius="small" scaling="95%">
          <Navbar />
          <main className="p-5">{children}</main>
          <Footer />
        </Theme>
      </body>
    </html>
  );
}
