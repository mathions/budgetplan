import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Youtube } from "iconsax-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="p-8 md:p-12 bg-footer">
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
            className="hover:text-white hover:underline hover:underline-offset-4"
          >
            Belanja Modal
          </Link>
          <Link
            href="/abt"
            className="hover:text-white hover:underline hover:underline-offset-4"
          >
            Anggaran Biaya Tambahan
          </Link>
        </div>
        <div className="text-strokestrong flex md:justify-end gap-2 md:items-end">
          <Link href="https://www.instagram.com/kemlu_ri/" className="hover:text-white">
            <Instagram />
          </Link>
          <Link href="https://web.facebook.com/Kemlu.RI/?locale=id_ID&_rdc=1&_rdr" className="hover:text-white">
            <Facebook />
          </Link>
          <Link href="https://www.youtube.com/@MoFAIndonesia" className="hover:text-white">
            <Youtube />
          </Link>
        </div>
      </div>
      <div className="pt-8 border-t border-strokestrong">
        <div className="text-strokestrong text-center">
          Hak Cipta © {currentYear} Kementerian Luar Negeri
        </div>
      </div>
    </div>
  );
}
