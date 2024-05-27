
import { columns } from "./table/column";
import { getRecap } from "@/lib/service-admin";
import { DataTable } from "./table/data-table";

// const data: Rekapitulasi[] = [
//   {
//     year: "2025",
//     office: "KBRI Abu Dhabi",
//     code: "Kendaraan Bermotor",
//     volume: "1",
//     rincian: "Kendaraan Dinas",
//     anggaran: "1.200.000.000",
//   },
//   {
//     year: "2025",
//     office: "KBRI Abu Dhabi",
//     code: "Peralatan Fasilitas Perkantoran",
//     volume: "1",
//     rincian: "Kendaraan Dinas",
//     anggaran: "1.200.000.000",
//   },
//   {
//     year: "2025",
//     office: "KBRI Abu Dhabi",
//     code: "Komunikasi",
//     volume: "1",
//     rincian: "Kendaraan Dinas",
//     anggaran: "1.200.000.000",
//   },
//   {
//     year: "2025",
//     office: "KBRI Abu Dhabi",
//     code: "Bangunan",
//     volume: "1",
//     rincian: "Kendaraan Dinas",
//     anggaran: "1.200.000.000",
//   },
//   {
//     year: "2025",
//     office: "KBRI Paris",
//     code: "Kendaraan Bermotor",
//     volume: "1",
//     rincian: "Kendaraan Dinas",
//     anggaran: "1.200.000.000",
//   },
//   {
//     year: "2025",
//     office: "KBRI Paris",
//     code: "Bangunan",
//     volume: "1",
//     rincian: "Kendaraan Dinas",
//     anggaran: "1.200.000.000",
//   }
// ]

export type Rekapitulasi = {
  year: string
  office: string
  code: string
  volume: string
  information: string
  total: string
}

export async function Table ({ token } : { token:string }) {
  const data = await getRecap(token)

  return (
    <DataTable columns={columns} data={data} />
  )
}