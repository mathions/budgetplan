import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Youtube } from "iconsax-react";

export default function Footer() {
  return (
    <div className="p-8 md:p-12 bg-textstrong">
      <div className="md:grid grid-cols-3 pb-8 space-y-6 md:space-y-0">
        <div className="flex items-end">
          <Link href="/beranda">
            <Image
              src="/logo-bp-grey.svg"
              height={32}
              width={218}
              alt="logo budgetplan"
            ></Image>
          </Link>
        </div>
        <div className="text-strokestrong font-semibold flex flex-col md:flex-row gap-2 md:gap-8 md:justify-center md:items-end">
          <Link
            href="/belanja-modal"
            className="hover:text-fill hover:underline hover:underline-offset-4"
          >
            Belanja Modal
          </Link>
          <Link
            href="/abt"
            className="hover:text-fill hover:underline hover:underline-offset-4"
          >
            Anggaran Biaya Tambahan
          </Link>
        </div>
        <div className="text-strokestrong flex md:justify-end gap-2 md:items-end">
          <Link href="/" className="hover:text-fill">
            <Instagram />
          </Link>
          <Link href="/" className="hover:text-fill">
            <Facebook />
          </Link>
          <Link href="/" className="hover:text-fill">
            <Youtube />
          </Link>
        </div>
      </div>
      <div className="pt-8 border-t border-strokestrong">
        <div className="text-strokestrong text-center">
          Hak Cipta © 2024 Kementerian Luar Negeri
        </div>
      </div>
    </div>
  );
}
