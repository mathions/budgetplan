import { Metadata } from "next";
import Navbar from "@/components/header/user/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Plus_Jakarta_Sans } from "next/font/google";

const plus_jakarta_sans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "budgetplan",
  description: "budgetplan",
  icons: {
    icon: "/logo.svg",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={plus_jakarta_sans.className}>
        <main className="flex-1">
          <div className="relative flex min-h-screen flex-col bg-grey-50">
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Navbar />
              <div className="bg-grey-50 min-h-screen">
                <div className="w-full mx-auto px-6 md:px-10 max-w-screen-xl flex-1 items-start ">
                  <main className="relative py-6 lg:gap-10 lg:py-8">
                    <div className="mx-auto w-full min-w-0">{children}</div>
                  </main>
                </div>
              </div>
              <Toaster />
            </ThemeProvider>
          </div>
        </main>
      </body>
    </html>
  );
}
