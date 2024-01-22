import { Button } from "@/components/ui/button";
import { Abt, columns } from "./column";
import { DataTable } from "./data-table";
import Link from "next/link";

async function getData(): Promise<Abt[]> {
  // Fetch data from your API here.
  return [
    {
      tahun_anggaran: 2023,
      perihal: "Pengajuan Kendaraan Dinas",
      status: "diajukan",
    },
    // ...
  ]
}

export default async function Abt () {
  const data = await getData()

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight">ABT</h2>
      <div>
        <Button asChild variant="outline">
          <Link href="/abt/create">Buat Pengajuan</Link>
        </Button>
      </div>
      <div className="my-6">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  )
}