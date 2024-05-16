// 'use client'

import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight} from "iconsax-react";

export const metadata: Metadata = {
  title: "Beranda",
};

export default function Beranda() {
  return (
    <div className="">
      {/* Header */}
      <div
        className=""
        style={{ backgroundImage: "url('/image/grid-layer.png')" }}
      >
        <div className="w-full py-14 md:py-28 flex-col justify-start items-center gap-3 md:gap-6 inline-flex">
          <div className="hidden md:flex text-6xl text-center font-bold leading-tight">
            Sistem informasi pengajuan <br /> anggaran belanja modal
          </div>
          <div className="flex md:hidden text-4xl text-center font-bold leading-tight">
            Sistem informasi <br />
            pengajuan anggaran <br />
            belanja modal
          </div>
          <div className="hidden md:flex text-xl text-center text-textweak">
            Budgetplan memfasilitasi proses pengajuan anggaran <br /> dari
            satuan kerja kepada biro umum
          </div>
          <div className="flex md:hidden text-base text-center text-textweak">
            Budgetplan memfasilitasi proses  pengajuan anggaran <br />dari
            satuan kerja kepada biro umum
          </div>
          <div className="flex gap-4 my-4">
            <Button asChild>
              <Link href="/belanja-modal">Belanja Modal</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/abt">ABT</Link>
            </Button>
          </div>
          <div className="px-4 md:px-0">
            <Image
              src="/image/logo-kemlu-bw.png"
              width={480}
              height={192}
              alt="Logo Kemlu"
            ></Image>
          </div>
        </div>
      </div>

      {/* Belanja Modal */}
      <div className="bg-background flex flex-col-reverse md:flex-row p-14 md:p-28">
        <div className="md:basis-1/2 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="tracking-wide text-textweak">BELANJA MODAL</div>
            <h2 className="font-bold">
              Penyampaian usulan<br/> belanja modal
            </h2>
            <div className="text-base text-textweak md:w-9/12">
              Satuan kerja menyampaikan usulan kebutuhan belanja modal kepada
              biro umum satu tahun sebelum pelaksanaan anggaran.
            </div>
          </div>
          <div>
            <Button asChild variant="secondary">
              <Link href="/belanja-modal">
                Buat Usulan <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="md:basis-1/2">
          <Image
            src="/image/logo-kemlu-bw.png"
            width={480}
            height={192}
            alt="Logo Kemlu"
          ></Image>
        </div>
      </div>

      {/* ABT */}
      <div className="flex flex-col md:flex-row p-14 md:p-28">
        <div className="md:basis-1/2">
          <Image
            src="/image/logo-kemlu-bw.png"
            width={480}
            height={192}
            alt="Logo Kemlu"
          ></Image>
        </div>
        <div className="md:basis-1/2 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="tracking-wide text-textweak">
              ANGGARAN BIAYA TAMBAHAN
            </div>
            <h2 className="font-bold">
              Pengajuan ABT
            </h2>
            <div className="text-base text-textweak md:w-9/12">
              Satuan kerja dapat mengajukan Anggaran Biaya Tambahan (ABT)
              apabila terdapat kebutuhan mendesak dan membutuhkan penambahan
              anggaran belanja modal.
            </div>
          </div>
          <div>
            <Button asChild variant="secondary">
              <Link href="/belanja-modal">
                Buat Pengajuan <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {/* Komentar Pengguna */}
      <div className="p-14 md:p-28 bg-background"></div>

      {/* Keunggulan */}
      <div className="p-14 md:p-28 bg-textstrong">
        <div>
          Selalu terhubung dengan Biro Umum
        </div>
        <div className="md:flex ">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      {/* CTA */}
      <div className=" bg-primary">
        <div
          style={{ backgroundImage: "url('/image/perlin-10.png')" }}
        >
          <div className="p-14 md:p-28">
            <h2 className="text-background font-bold ">
              Ingin mengajukan <br /> anggaran?
            </h2>
            <div className="flex gap-4 mt-6">
              <Button
                asChild
                className="bg-background text-primary hover:bg-background/80"
              >
                <Link href="/belanja-modal">Belanja Modal</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="border-background text-background hover:bg-background/20"
              >
                <Link href="/abt">ABT</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}

    </div>
  );
}
