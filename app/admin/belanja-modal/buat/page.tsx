import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import Breadcrumbs from "@/components/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FormBelanjaModal from "@/components/admin/belanja-modal/buat/form-belanja-modal";

export default async function BuatBelanjaModal() {
  const session: any = await getServerSession(authOptions)
  const token = session?.user?.token;

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Belanja Modal', href: '/admin/belanja-modal' },
          { label: 'Buat', href: '/admin/belanja-modal/buat', active: true },
        ]}
      />
      <h1 className="text-3xl font-bold tracking-tight">Mulai Tahun Anggaran</h1>
      <div className="my-6">
        <Card className="w-full">
          <CardContent className="grid gap-4 py-6">
            <FormBelanjaModal token={token}/>
          </CardContent>
        </Card>  
      </div>
    </>
  )
}