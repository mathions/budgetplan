import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import { AbtForm } from "./abt-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Breadcrumbs from "@/components/breadcrumbs"
import FormAbt from "@/components/user/abt/buat/form-abt"

export default async function Buat () {
  const session: any = await getServerSession(authOptions)
  const token = session?.user?.token;

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Beranda', href: '/beranda' },
          { label: 'ABT', href: '/abt' },
          { label: 'Buat', href: '/abt/buat', active: true },
        ]}
      />
      <h1 className="text-3xl font-bold tracking-tight">Buat Pengajuan ABT</h1>
      <div className="my-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{session?.user?.office}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <FormAbt token={token}/>
        </CardContent>
      </Card>  
      </div>
    </>
  )
}
