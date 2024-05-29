// 'use client'

import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Data, MessageText1, TickCircle } from "iconsax-react";

// export const metadata: Metadata = {
//   title: "Beranda",
// };

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
            Budgetplan memfasilitasi proses pengajuan anggaran <br />
            dari satuan kerja kepada biro umum
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
      <div className="bg-background flex flex-col-reverse gap-8 md:gap-16 md:flex-row px-6 pb-6 pt-16 md:p-28 md:pb-14 md:pt-32">
        <div className="md:basis-1/2 flex flex-col gap-4">
          <div className="flex flex-col gap-3 md:w-9/12 ">
            <div className="bg-primary/15 px-3 py-2 w-fit rounded-md">
              <div className="text-sm font-semibold tracking-wide text-textstrong">
                BELANJA MODAL
              </div>
            </div>
            <h3 className="">Penyampaian usulan belanja modal</h3>
            <div className="text-base text-textweak">
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
          <div className="bg-primary/5 rounded-xl p-6 h-full flex justify-center">
            <Image
              src="/image/beranda2.png"
              width={480}
              height={192}
              alt="Logo Kemlu"
            ></Image>
          </div>
        </div>
      </div>

      {/* ABT */}
      <div className="bg-background flex flex-col gap-8 md:gap-16 md:flex-row px-6 pt-6 pb-16 md:px-28 md:pt-14 md:pb-36">
        <div className="md:basis-1/2">
          <div className="bg-primary/5 rounded-xl p-6 h-full flex justify-center">
          <Image
            src="/image/beranda3.png"
            width={480}
            height={192}
            alt="Logo Kemlu"
          ></Image>
          </div>
        </div>
        <div className="md:basis-1/2 flex flex-col gap-4">
          <div className="flex flex-col gap-3 md:w-9/12">
            <div className="bg-primary/15 px-3 py-2 w-fit rounded-md">
              <div className="text-sm font-semibold tracking-wide text-textstrong">
                ABT
              </div>
            </div>
            <h3>Pengajuan anggaran biaya tambahan</h3>
            <div className="text-base text-textweak">
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

      {/* Keunggulan */}
      <div className="px-8 py-16 md:p-28 bg-textstrong space-y-8 md:space-y-16">
        <h3 className="text-strokeweak text-center">Selalu terhubung dengan <span className="text-background">Biro Umum</span></h3>
        <div className="grid md:grid-cols-3 gap-6 md:gap-12 px-4 md:px-12">
          <div className="bg-[#333852] border border-strokewak text-white space-y-4 rounded-xl px-4 py-9">
            <div className="flex justify-center">
              <Data className="h-9 w-9"/>
            </div>
            <div className="space-y-2 text-center">
              <h5>Database</h5>
              <div>Setiap pengajuan akan tersimpan di database</div>
            </div>
          </div>
          <div className="bg-[#333852] border border-strokewak text-white space-y-4 rounded-xl px-4 py-9">
            <div className="flex justify-center">
              <TickCircle className="h-9 w-9"/>
            </div>
            <div className="space-y-2 text-center">
              <h5>Status Pengajuan</h5>
              <div>Status pengajuan dapat dipantau melalui sistem</div>
            </div>
          </div>
          <div className="bg-[#333852] border border-strokewak text-white space-y-4 rounded-xl px-4 py-9">
            <div className="flex justify-center">
              <MessageText1 className="h-9 w-9"/>
            </div>
            <div className="space-y-2 text-center">
              <h5>Umpan Balik</h5>
              <div>Terdapat umpan balik apabila terdapat kekurangan pada pengajuan</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className=" bg-primary">
        <div style={{ backgroundImage: "url('/image/perlin-10.png')" }}>
          <div className="p-12 md:p-28">
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
