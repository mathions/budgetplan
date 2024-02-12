import { Item } from "@/lib/definitions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import DownloadPDF from "./download-pdf";
import Rab from "./rab";

export default function Proposal({ items, slug, token, office, year } : { items: [Item]; slug: string, token: string, office: string, year: string }) {
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{office}</CardTitle>
          <CardDescription>Tahun Anggaran {year}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <p className="text-sm font-medium leading-none">
              Daftar Isian Pelaksanaan Anggaran (DIPA)
            </p>
            <DownloadPDF slug={slug} token={token}/>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium leading-none">
              Rencana Anggaran Biaya
            </p>
            <div className="rounded-md border">
              <Rab items={items} />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}