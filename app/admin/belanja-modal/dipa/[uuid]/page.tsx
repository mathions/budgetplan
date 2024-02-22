import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import { getItemsDipa, getDetailProposal } from "@/lib/service-admin";
import Breadcrumbs from "@/components/breadcrumbs";
import Proposal from "@/components/admin/belanja-modal/dipa/proposal";

export default async function Dipa ({ params }: {params: { uuid: string } }) {
  const uuid = params.uuid;
  const session: any = await getServerSession(authOptions)
  const token = session?.user?.token;
  const proposal = await getDetailProposal(token, uuid);
  const office = proposal?.office;
  const year = proposal?.year;
  const items = await getItemsDipa(token, uuid);
  console.log(items)

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Belanja Modal', href: '/admin/belanja-modal'},
          { label: 'Penyesuaian', href: '/admin/belanja-modal/dipa', active: true },
        ]}
      />
      <h1 className="text-3xl font-bold tracking-tight">Penyesuaian</h1>
      <div className="my-6">
        <Proposal items={items} uuid={uuid} token={token} office={office} year={year}/>
      </div>
    </>
  )
}