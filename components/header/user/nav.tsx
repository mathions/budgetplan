"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "../../icons";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { Button } from "../../ui/button";
import { Home, Shop, ShopAdd, HambergerMenu } from "iconsax-react";
import { Logo } from "../logo";

export default function Nav() {
  const pathname = usePathname();
  const routes = [
    {
      href: "/beranda",
      label: "Beranda",
      icon: Home,
    },
    {
      href: "/belanja-modal",
      label: "Belanja Modal",
      icon: Shop,
    },
    {
      href: "/abt",
      label: "ABT",
      icon: ShopAdd,
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
                "bg-background text-textweak hover:bg-strokeweak hover:text-textstrong",
                pathname.includes(route.href)
                  ? "bg-primary text-background hover:bg-primary/80 hover:text-background"
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
            <Link href="/beranda" className="mb-4">
              <Logo />
            </Link>
            {routes.map((route, i) => (
              <Link
                key={i}
                href={route.href}
                className={cn(
                  "mx-[-0.65rem] flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-strokeweak",
                  pathname.includes(route.href)
                    ? "mx-[-0.65rem] flex items-center gap-3 rounded-lg bg-primary text-background px-4 py-3 hover:bg-primary/80"
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
