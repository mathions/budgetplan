import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/admin/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "budgetplan",
  description: "budgetplan",
  icons: {
    icon: "/bp.svg",
  },
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
    </body>
    </html>
  );
}
