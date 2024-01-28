import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./Navbar";
import Footer from "./Footer";

import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <Theme
          accentColor="teal"
          grayColor="sand"
          radius="medium"
          scaling="95%"
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Theme>
      </body>
    </html>
  );
}
