import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import Proposal from "@/components/user/belanja-modal/usulan/proposal";
import { getFilesPath, getItems, getProposal } from "@/lib/service";
import Breadcrumbs from "@/components/breadcrumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Usulan({ params }: {params: { uuid: string } }) {
  const uuid = params.uuid;
  const session: any = await getServerSession(authOptions)
  const token = session?.user?.token;
  const proposal = await getProposal(token);
  const files = await getFilesPath(token, uuid)
  const items = await getItems(token, uuid);
  console.log(proposal)
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
          { label: 'Beranda', href: '/beranda' },
          { label: 'Belanja Modal', href: '/belanja-modal' },
          { label: 'Usulan', href: `/belanja-modal/usulan/${uuid}`, active: true }
        ]}
      />
      <h1 className="text-3xl font-bold tracking-tight">Usulan</h1>
      <div className="my-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{proposal?.office}</CardTitle>
            <CardDescription>Tahun Anggaran {proposal?.year}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
          <div className="space-y-3">
            <p className="text-sm font-medium leading-none">Status</p>
            <p>{proposal?.status}</p>
          </div>
            <Proposal uuid={uuid} token={token} files={files} items={items}  />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
