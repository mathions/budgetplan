import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import { getItems, getProposal } from "@/lib/service";
import Breadcrumbs from "@/components/breadcrumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import DownloadPDF from "@/components/user/belanja-modal/dipa/download-pdf";
import Rab from "@/components/user/belanja-modal/dipa/rab";

export default async function Dipa({ params }: {params: { uuid: string } }) {
  const uuid = params.uuid;
  const session: any = await getServerSession(authOptions)
  const token = session?.user?.token;
  const proposal = await getProposal(token);
  const items = await getItems(token, uuid);
  console.log(proposal)
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Beranda', href: '/beranda' },
          { label: 'Belanja Modal', href: '/belanja-modal' },
          { label: 'DIPA', href: `/belanja-modal/dipa/${uuid}`, active: true }
        ]}
      />
      <h1 className="text-3xl font-bold tracking-tight">DIPA</h1>
      <div className="my-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{proposal?.office}</CardTitle>
            <CardDescription>Tahun Anggaran {proposal?.year}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm font-medium leading-none">
                Daftar Isian Pelaksanaan Anggaran (DIPA)
              </p>
              <DownloadPDF uuid={uuid} token={token}/>
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
      </div>
    </>
  );
}
