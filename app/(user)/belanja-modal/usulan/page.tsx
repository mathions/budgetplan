"use client"
import { promises as fs } from "fs"
import path from "path"
import { dataSchema } from "./data/schema"
import { z } from "zod"

// import { columns } from "./components/column"
import { DataTable } from "./components/data-table"

import { FileTextIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import Link from "next/link"
import ManualTable from "./components/manual-table"
import { Input } from "@/components/ui/input"

import { useToast } from "@/components/ui/use-toast"

export default function Usulan () {
  const { toast } = useToast()
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight">Belanja Modal / Usulan</h2>
      <div className="my-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>KBRI Islamabad</CardTitle>
            <CardDescription>Tahun Anggaran 2025</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid items-start pb-2 last:mb-0 last:pb-0">
              <div className="space-y-2">
                <p className="text-sm font-medium leading-none">
                  Brafaks
                </p>
                <div className="items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground flex justify-start h-14 ">
                  <div className="w-full">
                    <input type="file" className="block w-full text-sm text-gray-500
                      file:me-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary file:text-white
                      hover:file:bg-primary/90
                      hover:file:cursor-pointer
                      file:disabled:opacity-50 file:disabled:pointer-events-none
                      dark:file:bg-blue-500
                      dark:hover:file:bg-blue-400 hover:cursor-pointer p-3" />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid items-start pb-2 last:mb-0 last:pb-0">
              <div className="space-y-2">
                <p className="text-sm font-medium leading-none">
                  Rencana Anggaran Biaya
                </p>
                <div className="">
                  <ManualTable />
                  <div className="grid my-3">
                    <Button 
                      className="flex justify-self-end"
                      onClick={() => {
                        toast({
                          title: "Pengajuan Usulan Belanja Modal Berhasil Disimpan",
                          description: "Jum'at, 10 Februari 2024, 13.00 WIB",
                        })
                      }} 
                    ><Link href="/belanja-modal">Simpan</Link></Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}