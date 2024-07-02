import Link from "next/link";
import Nav from "./nav";
import { Notif } from "./notif";
import { Profile } from "./profile";
import { ModeToggle } from "../mode-toggle";
import { Logo } from "../logo";

export default async function Header() {
  return (
    <header className="sticky top-0 z-40 first:flex h-16 justify-center items-center px-4 pt-3 pb-1 md:px-8">
      <div className="flex justify-between bg-background w-full rounded-2xl px-2 md:px-6 py-2 gap-6 shadow">
        <div className="hidden md:flex align-center">
          <Link href="/admin">
            <Logo />
          </Link>
        </div>
        <Nav />
        <div className="flex w-full justify-end items-center gap-2 md:ml-auto md:gap-3 mr-2 md:mr-0">
          <div className="flex gap-1">
            <ModeToggle />
            <Notif />
          </div>
          <Profile />
        </div>
      </div>
    </header>
  );
}
