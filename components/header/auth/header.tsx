import { ModeToggle } from "../mode-toggle";
import { Profile } from "../profile";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { Language } from "../language";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 first:flex h-16 justify-center items-center px-4 pt-3 pb-1 md:px-8">
      <div className="flex justify-between bg-background w-full rounded-2xl px-2 md:px-6 py-2 gap-6 shadow">
        <div className="hidden md:flex align-center">
          <Link href="/beranda" className="w-[218px] flex align-center">
            <Image src={logo} width={218} height={32} alt="logo"></Image>
            <span className="sr-only">budgetplan</span>
          </Link>
        </div>
        <div className="flex w-full justify-end items-center gap-2 md:ml-auto md:gap-3 mr-2 md:mr-0">
          <div className="flex gap-1">
            <ModeToggle />
            <Language/>
          </div>
        </div>
      </div>
    </header>
  );
}
