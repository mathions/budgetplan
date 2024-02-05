"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
        <main className="flex-1">
        <div className="relative flex min-h-screen flex-col bg-background">
          <ThemeProvider attribute="class" defaultTheme='system' enableSystem>
          <Header/>
          <div className="container max-w-screen-xl flex-1 items-start">
            <main className="relative py-6 lg:gap-10 lg:py-8">
              <div className="mx-auto w-full min-w-0">
                {children}
              </div>
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
        </div>
        </main>
        </SessionProvider>
    </body>
    </html>
  );
}
