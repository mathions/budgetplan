// 'use client'

import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Beranda"
}

export default function Beranda () {

  return (
    <>
      {/* <h2 className="text-3xl font-bold tracking-tight">Beranda</h2> */}
      <div className="flex justify-center">    
      <div className="grid my-6 gap-4 max-w-[1000px]">
        <div className="h-60 rounded-xl p-6 grid content-center flex-row justify-center">
          <div className="flex justify-center">
            <div className="bg-muted rounded-lg px-3 py-1 w-fit text-center font-medium mt-4 ">
              Biro Umum - Kementerian Luar Negeri RI
            </div>
          </div>
          <div className="text-4xl md:text-6xl font-bold text-center mt-6">
            budgetplan
          </div>
          <div className="text-center text-xl font-medium mt-6 text-foreground/60">
            Aplikasi pengajuan usulan Belanja Modal dan ABT
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground p-10 flex flex-col-reverse md:flex-row ">
          <div className="md:basis-1/2 space-y-4">
            <h2 className="text-[32px] font-semibold">Belanja Modal</h2>
            <p className="text-[18px] text-foreground/60 font-normal">
              Buat usulan kebutuhan belanja modal dengan mengunggah dokumen brafaks 
              dan mengisi rencana anggaran biaya (RAB). Biro Umum akan memproses
              pengajuan tersebut dan memberikan penyesuaian RAB.
            </p>
            <Button asChild>
              <Link href="/belanja-modal">Lihat Belanja Modal</Link>
            </Button>
          </div>
          <div className="md:basis-1/2 flex justify-center mb-4 md:mb-0">
            <Image src="/image/2.png" alt="belanja-modal" width={400} height={300}/>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground p-10 flex flex-col md:flex-row ">
          <div className="md:basis-1/2 mb-4 md:mb-0 grid content-center">
            <Image src="/image/3.png" alt="abt" width={400} height={300}/>
          </div>
          <div className="md:basis-1/2 space-y-4">
            <h2 className="text-[32px] font-semibold">ABT</h2>
            <p className="text-[18px] text-foreground/60 font-normal">
              Anggaran Biaya Tambahan (ABT) adalah alokasi 
              tambahan anggaran pada tahun berjalan yang 
              bersifat mendesak. Satuan kerja dapat membuat 
              pengajuan ABT dengan mengisi perihal dan 
              mengunggah dokumen brafaks untuk kemudian diproses oleh Biro Umum.
            </p>
            <Button asChild>
              <Link href="/abt">Lihat ABT</Link>
            </Button>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}