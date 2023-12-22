import type { Metadata } from "next";
import { Inria_Sans } from "next/font/google";
import "./globals.css";

const inria_sans = Inria_Sans({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Sunny Snippets",
  description: "Bringing rays of positivity through curated news bites",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inria_sans.className}>{children}</body>
    </html>
  );
}
