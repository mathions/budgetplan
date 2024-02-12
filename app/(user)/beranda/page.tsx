// 'use client'

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Beranda () {

  return (
    <>
      {/* <h2 className="text-3xl font-bold tracking-tight">Beranda</h2> */}
      <div className="grid my-6 gap-4">
        <div className="h-60 rounded-xl bg-card  p-6 grid content-center flex-row">
          <div className="text-4xl md:text-6xl font-bold text-center">
            budgetplan
          </div>
          <div className="text-center text-xl">
            Aplikasi pengajuan usulan Belanja Modal dan ABT
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <Link href="/belanja-modal"  className="md:basis-1/2 h-48 rounded-xl border bg-card shadow p-6 grid content-center gap-2">
            <div className="text-3xl font-extrabold text-center">
              Belanja Modal            
            </div>
            <div className="text-center">
              Pengajuan Usulan Anggaran Telah Dibuka
            </div>
          </Link>
          <Link href="/abt" className="md:basis-1/2  h-48 rounded-xl border bg-card shadow p-6 grid content-center gap-2">
            <div className="text-3xl font-extrabold text-center">
              Anggaran Biaya Tambahan  
            </div>
            <div className="flex flex-row text-center">
              <div className="basis-1/2">
                <div>Diajukan : 1</div>
                <div>Diproses : 1</div>
              </div>
              <div className="basis-1/2">
                <div>Diterima : 0</div>
                <div>Ditolak : 0</div>
              </div>
            </div>

          </Link>
        </div>
      </div>

    </>
  )
}