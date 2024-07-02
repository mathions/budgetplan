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
            href="/super-admin/akun-pengguna"
            className="hover:text-white hover:underline hover:underline-offset-4"
          >
            Akun Pengguna
          </Link>
          <Link
            href="/super-admin/kode-akun"
            className="hover:text-white hover:underline hover:underline-offset-4"
          >
            Kode Akun
          </Link>
          <Link
            href="/super-admin/mata-uang"
            className="hover:text-white hover:underline hover:underline-offset-4"
          >
            Mata Uang
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
