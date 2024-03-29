
import { FileTextIcon} from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { getProposal } from "@/lib/service"

export default async function BelanjaModalCard({ token }: { token: any }) {
  const data = await getProposal(token)
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{data?.office}</CardTitle>
        <CardDescription>Tahun Anggaran {data?.year}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0">
          <div className="h-full space-y-2">
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
            <span className="flex h-full w-1 ml-[2px] translate-y-1 rounded-full bg-primary" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium leading-none">
              Pengajuan Usulan Kebutuhan Belanja Modal
            </p>
            <p className="text-sm text-muted-foreground">
              {data?.created_at}
            </p>
            <Button asChild variant="outline" className="flex justify-start h-12 ">
              <Link href={`/belanja-modal/usulan/${data?.uuid}`}>
                <FileTextIcon className="mr-4 h-4 w-4" />Usulan
              </Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0">
          <div className="h-full space-y-2">
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
            <span className="flex h-full w-1 ml-[2px] translate-y-1 rounded-full bg-foreground/50" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium leading-none">
              Usulan Anggaran Diterima
            </p>
            <p className="text-sm text-muted-foreground">
              3 hari yang lalu
            </p>
          </div>
        </div>
        <div className="grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0">
          <div className="h-full space-y-2">
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-foreground/50" />
            <span className="flex h-full w-1 ml-[2px] translate-y-1 rounded-full bg-foreground/50" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium leading-none">
              Terdapat Penyesuaian RAB
            </p>
            <p className="text-sm text-muted-foreground">
              3 hari yang lalu
            </p>
            <Button asChild variant="outline" className="flex justify-start h-12">
              <Link href={`/belanja-modal/penyesuaian/${data?.uuid}`}>
                <FileTextIcon className="mr-4 h-4 w-4" />Penyesuaian
              </Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-foreground/50" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              Pelaksanaan Anggaran
            </p>
            <p className="text-sm text-muted-foreground">
              3 hari yang lalu
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
