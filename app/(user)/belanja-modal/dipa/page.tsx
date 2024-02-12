

import { FileTextIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import ManualTable from "../../../../components/zzz/components/manual-table"

export default async function Dipa () {

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight">Daftar Isian Pelaksanaan Anggaran (DIPA)</h2>
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
                Daftar Isian Pelaksanaan Anggaran (DIPA)
                </p>
                <Button asChild variant="outline" className="flex justify-start h-12">
                  {/* <Link href="/belanja-modal/usulan"> */}
                  <a href="/dokumen/DIPA-Kemlu-TA-2023.pdf" download="DIPA-Kemlu-TA-2023.pdf">
                    <FileTextIcon className="mr-4 h-4 w-4" />Download
                    </a>
                  {/* </Link> */}
                </Button>
              </div>
            </div>
            <div className="grid items-start pb-2 last:mb-0 last:pb-0">
              <div className="space-y-2">
                <p className="text-sm font-medium leading-none">
                  Rencana Anggaran Biaya
                </p>
                <div className="">
                  {/* <RabTable columns={columns} data={data} /> */}
                  <ManualTable />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}