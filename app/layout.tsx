import type { Metadata } from "next";
import { Inria_Sans } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "./ui-providers";

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
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />

        {/* Icon (png) */}
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />

        {/* Apple Icon (png) */}
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <ClerkProvider>
        <body className={inria_sans.className}>
          <Providers>{children}</Providers>
        </body>
      </ClerkProvider>
    </html>
  );
}
