"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Category, Shop, ShopAdd, HambergerMenu, DocumentText } from "iconsax-react";
import Image from "next/image";
import logo from "@/public/logo.svg";

export default function Nav() {
  const pathname = usePathname();
  const routes = [
    {
      href: "/admin",
      nav: "dashboard",
      label: "Dashboard",
      icon: Category,
    },
    {
      href: "admin/belanja-modal",
      nav: "belanja-modal",
      label: "Belanja Modal",
      icon: Shop,
    },
    {
      href: "admin/abt",
      nav: "abt",
      label: "ABT",
      icon: ShopAdd,
    },
    {
      href: "admin/rekapitulasi",
      nav: "rekapitulasi",
      label: "Rekapitulasi",
      icon: DocumentText,
    },
  ];

  return (
    <>
      <nav className="hidden flex-col gap-8 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <div className="flex gap-2">
          {routes.map((route, i) => (
            <Button
              asChild
              key={i}
              className={cn(
                "bg-background text-grey-700 hover:bg-grey-100",
                pathname.includes(route.href)
                  ? "bg-primary text-white hover:bg-primary/90"
                  : ""
              )}
            >
              <Link href={route.href}>
                <route.icon className="mr-2 h-5 w-5" />
                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
            <HambergerMenu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-4 text-xl font-medium">
            <Link href="/beranda" className="w-[218px] flex align-center mb-4">
              <Image src={logo} width={218} height={32} alt="logo"></Image>
              <span className="sr-only">budgetplan</span>
            </Link>
            {routes.map((route, i) => (
              <Link
                key={i}
                href={route.href}
                className={cn(
                  "mx-[-0.65rem] flex items-center gap-3 rounded-md px-4 py-3 text-muted-foreground hover:text-foreground",
                  pathname === route.href || pathname.includes(route.nav)
                    ? "mx-[-0.65rem] flex items-center gap-3 rounded-md bg-muted px-4 py-3 text-foreground hover:text-foreground"
                    : ""
                )}
              >
                <route.icon className="h-6 w-6" />
                {route.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
