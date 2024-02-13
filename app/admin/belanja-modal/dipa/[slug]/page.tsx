import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import { getItems, getProposal } from "@/lib/service-admin";
import Breadcrumbs from "@/components/breadcrumbs";
import Proposal from "@/components/admin/belanja-modal/dipa/proposal";

export default async function Dipa ({ params }: {params: { slug: string } }) {
  const slug = params.slug;
  const session: any = await getServerSession(authOptions)
  const token = session?.user?.token;
  const proposal = await getProposal(token, slug);
  const office = proposal?.office;
  const year = proposal?.year;
  const items = await getItems(token, slug);

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Belanja Modal', href: '/admin/belanja-modal'},
          { label: 'DIPA', href: '/admin/belanja-modal/dipa', active: true },
        ]}
      />
      <h1 className="text-3xl font-bold tracking-tight">Daftar Isian Pelaksanaan Anggaran (DIPA)</h1>
      <div className="my-6">
        <Proposal items={items} slug={slug} token={token} office={office} year={year}/>
      </div>
    </>
  )
}