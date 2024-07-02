"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { Button } from "../../ui/button";
import { SafeHome, HambergerMenu, Profile2User, Note, Money } from "iconsax-react";
import { Logo } from "../logo";

export default function Nav() {
  const pathname = usePathname();
  const routes = [
    {
      href: "/super-admin",
      nav: "beranda",
      label: "Beranda",
      icon: SafeHome,
    },
    {
      href: "/super-admin/akun-pengguna",
      nav: "akun-pengguna",
      label: "Akun Pengguna",
      icon: Profile2User,
    },
    {
      href: "/super-admin/kode-akun",
      nav: "kode-akun",
      label: "Kode Akun",
      icon: Note,
    },
    {
      href: "/super-admin/mata-uang",
      nav: "mata-uang",
      label: "Mata Uang",
      icon: Money,
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
                pathname === route.href || pathname.includes(route.nav)
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
            <Link href="/super-admin" className="mb-4">
              <Logo />
            </Link>
            {routes.map((route, i) => (
              <Link
                key={i}
                href={route.href}
                className={cn(
                  "mx-[-0.65rem] flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-strokeweak",
                  pathname === route.href || pathname.includes(route.nav)
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
