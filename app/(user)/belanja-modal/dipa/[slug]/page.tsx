import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import Proposal from "@/components/user/belanja-modal/dipa/proposal";
import { getItems, getProposal } from "@/lib/service";
import Breadcrumbs from "@/components/breadcrumbs";

export default async function Dipa({ params }: {params: { slug: string } }) {
  const slug = params.slug;
  const session: any = await getServerSession(authOptions)
  const token = session?.user?.token;
  const proposal = await getProposal(token);
  const office = proposal?.user?.office;
  const year = proposal?.year_id;
  const items = await getItems(token, slug);
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Beranda', href: '/beranda' },
          { label: 'Belanja Modal', href: '/belanja-modal' },
          { label: 'DIPA', href: `/belanja-modal/dipa/${slug}`, active: true }
        ]}
      />
      <h1 className="text-3xl font-bold tracking-tight">DIPA</h1>
      <div className="my-6">
        <Proposal items={items} slug={slug} token={token} office={office} year={year}/>
      </div>
    </>
  );
}
