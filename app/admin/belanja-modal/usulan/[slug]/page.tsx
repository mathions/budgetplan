import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import { getItems, getProposal } from "@/lib/service-admin";
import Rab from "@/components/admin/belanja-modal/usulan/rab";
import DownloadPDF from "@/components/admin/belanja-modal/usulan/download-pdf";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import Breadcrumbs from "@/components/breadcrumbs";

export default async function Usulan({ params }: {params: { slug: string } }) {
  const slug = params.slug;
  const session: any = await getServerSession(authOptions)
  const token = session?.user?.token;
  const proposal = await getProposal(token, slug)
  const items = await getItems(token, slug)
  
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Belanja Modal', href: '/admin/belanja-modal'},
          { label: 'Usulan', href: '/admin/belanja-modal/usulan', active: true },
        ]}
      />
      <h1 className="text-3xl font-bold tracking-tight">Usulan</h1>
      <div className="py-6">
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
            <DownloadPDF token={token} slug={slug}/>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium leading-none">
              Rencana Anggaran Biaya
            </p>
            <div className="rounded-md border">
            <Rab items={items}/>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </>
  );
}
