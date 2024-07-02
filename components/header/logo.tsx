import Image from "next/image";
import logo from "@/public/icon.svg";
import { Anek_Malayalam } from "next/font/google";

const anek_malayalam = Anek_Malayalam({ subsets: ["latin"] });

export function Logo() {
  return(
    <div className="w-[218px] flex align-center gap-3">
      <Image src={logo} width={32} height={32} alt="logo"></Image>
      <span className={`${anek_malayalam.className} text-[32px] font-semibold text-textstrong tracking-wide`}>budgetplan</span>
    </div>
  )
}