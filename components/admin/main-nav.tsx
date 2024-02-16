"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function MainNav () {
    const pathname = usePathname()
    const routes = [
      {
          href: "/admin",
          nav: "dashboard",
          label: "Dashboard",
      },
      {
          href: "/admin/belanja-modal",
          nav: "belanja-modal",
          label: "Belanja Modal",
      },
      {
          href: "/admin/abt",
          nav: "abt",
          label: "ABT",
      },
      {
        href: "/admin/rekapitulasi",
        nav: "rekapitulasi",
        label: "Rekapitulasi",
    },
    ];

  return (
    <div className="">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          >
            <svg
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
            >
              <path
                d="M3 5H11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3 12H16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3 19H21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <Link href="/" className="flex items-center">
              <Icons.bp className="mr-2 h-6 w-6" />
              <span className="font-bold text-lg">
                budgetplan
              </span>
            </Link>
            <div className="my-4 pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                  {routes.map((route, i) => (
                      <Link 
                      key={i}
                      href={route.href}
                      >
                          {route.label}
                      </Link>
                  ))}
              </div>                    
            </div>
          </SheetContent>
      </Sheet>
      <div className="mr-4 hidden md:flex">
        <Link href="/" className="mr-6 flex items-center space-x-1">
          <Icons.bp className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">
            budgetplan
          </span>
        </Link>
        <nav className="flex items-center text-sm">
          {routes.map((route, i) => (
            <Link
            key={i}
            href={route.href}
            className={cn(
              "flex h-8 items-center justify-center rounded-lg px-4 text-center text-sm transition-colors hover:text-foreground",
              pathname === route.href || pathname.includes(route.nav)
              ? "bg-muted font-medium text-foreground" : "text-muted-foreground"
            )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}