import { Metadata } from "next";
import Navbar from "@/components/header/user/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/header/user/footer";
import Error from "./error";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

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
        <ErrorBoundary errorComponent={Error}>
          <div className="w-full min-h-screen">{children}</div>
        </ErrorBoundary>
        <Footer />
        <Toaster />
      </ThemeProvider>
    </div>
  );
}
