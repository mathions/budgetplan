import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import { getItems, getDetailProposal, getFiles, getListFiles } from "@/lib/service-admin";
import Rab from "@/components/admin/belanja-modal/usulan/rab";
import DownloadPDF from "@/components/admin/belanja-modal/usulan/download-pdf";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import Breadcrumbs from "@/components/breadcrumbs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import UbahStatus from "@/components/admin/belanja-modal/usulan/ubah-status";
import BuatDipa from "@/components/admin/belanja-modal/usulan/buat-penyesuaian";

export default async function Usulan({ params }: {params: { uuid: string } }) {
  const uuid = params.uuid;
  const session: any = await getServerSession(authOptions)
  const token = session?.user?.token;
  const proposal = await getDetailProposal(token, uuid)
  const items = await getItems(token, uuid)
  console.log(items)
  const files = await getListFiles(token, uuid)
  console.log(files)
  if(session == null){
    return (
      <>
        <div className="w-full mt-24 flex-row flex justify-center align-middle">
          <Button asChild variant="link"><Link href="/login">Unauthenticated! Please login again</Link></Button>
        </div>
      </>
    )
  }
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
            <div className="space-y-4">
              <div className="space-y-3">
                <p className="text-sm font-medium leading-none">Status</p>
                <p>{proposal?.status}</p>
              </div>
              <div className="space-y-3">
                {/* <p className="text-sm font-medium leading-none">
                  Brafaks
                </p>
                <DownloadPDF token={token} uuid={uuid}/> */}
                <p className="text-sm font-medium leading-none">
                  Dokumen Brafaks
                </p>
                <div className="w-full rounded-md border p-4">
                  <div className="flex flex-wrap w-full gap-4">
                    {files?.data?.map((item: { path: string, uuid: string }, index: number) => (
                      <div key={index} className="rounded-md border text-sm p-2">
                        {item.path.length > 20 ? `${item.path.slice(0, 20)}...` : item.path}
                        <div className="text-muted-foreground ">{item.path.split('.').pop()?.toUpperCase()}</div>
                        <DownloadPDF token={token} uuid={uuid} fileuuid={item.uuid}/>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-medium leading-none">
                  Rencana Anggaran Biaya
                </p>
                <div className="rounded-md border">
                <Rab items={items}/>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                {/* <Button variant="outline" className="w-[96px]">Kembali</Button> */}
                <UbahStatus uuid={uuid} token={token}/>
                <BuatDipa uuid={uuid} token={token}></BuatDipa>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
