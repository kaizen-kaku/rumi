import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { SessionProvider } from 'next-auth/react';

const lato = Lato({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Ollama",
  description: "_____internal____",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}