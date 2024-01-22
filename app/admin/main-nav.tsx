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
          href: "/admin/",
          label: "Dashboard",
      },
      {
          href: "/admin/belanja-modal",
          label: "Belanja Modal",
      },
      {
          href: "/admin/abt",
          label: "ABT",
      },
      {
        href: "/admin/rekapitulasi",
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
              <Icons.logo className="mr-2 h-4 w-4" />
              <span className="font-bold">
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
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Icons.logo className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">
            budgetplan
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
            {routes.map((route, i) => (
              <Link
                key={i}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground/80",
                  pathname === route.href ? "text-foreground" : "text-foreground/60"
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