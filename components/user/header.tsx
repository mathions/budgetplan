import MainNav from "./main-nav";
import { ModeToggle } from "../mode-toggle";
import { UserNav } from "./user-nav";
import Link from "next/link";
import { Icons } from "../icons";

export default function Header () {
  
  return (
    <header className="sticky top-0 z-40 w-full flex justify-start md:justify-center border-b bg-bsc">
      <div className="container flex justify-end md:justify-between h-16 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icons.ball className="h-8 w-8" />
            <span className="hidden font-bold sm:inline-block text-2xl">
              budgetplan
            </span>
          </Link>
        </div>
        <div className="flex items-center space-x-2 justify-end">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
      <div className="absolute top-0 z-50">
        <div className="container flex h-16 max-w-screen-2xl items-center">
          <MainNav />
        </div>
      </div>
    </header>
  )
}