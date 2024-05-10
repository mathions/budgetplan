import { Metadata } from "next";
import Navbar from "@/components/header/auth/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

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
    <div className="relative flex h-screen flex-col bg-bg">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Navbar />
        <div className="w-screen h-full my-auto flex justify-center items-center">
          {children}
        </div>
        <Toaster />
      </ThemeProvider>
    </div>
  );
}
