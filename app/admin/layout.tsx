import type { Metadata } from "next";
import Navbar from "@/components/header/admin/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/header/admin/footer";

export const metadata: Metadata = {
  title: "Budgetplan",
  description: "budgetplan",
  icons: {
    icon: "/icon.svg",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex h-full flex-col bg-bg">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Navbar />
        <div className="w-full min-h-screen">{children}</div>
        <Toaster />
        <Footer />
      </ThemeProvider>
    </div>
  );
}
