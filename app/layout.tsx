import type { Metadata } from "next";
import "./globals.css";
import { LayoutNav } from "@/components/LayoutNav";

export const metadata: Metadata = {
  title: "CMES — Discover Your Dream Type",
  description:
    "Find your dream type across Contribution, Mastery, Experience, and Stability.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <LayoutNav />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
