import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./Navbar";
import "./globals.css";
import "./theme-config.css";
// import Footer from "./Footer";

import { Container, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import AuthProvider from "./auth/Provider";

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
      <AuthProvider>
        <body className={inter.variable}>
          <Theme accentColor="teal" radius="small" scaling="95%">
            <Navbar />
            <main className="p-5">
              {/* To always Centralize content instead of stretcing */}
              <Container>{children}</Container>
            </main>
          </Theme>
        </body>
      </AuthProvider>
    </html>
  );
}
