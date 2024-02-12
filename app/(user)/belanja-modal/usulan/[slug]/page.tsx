import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import Proposal from "@/components/user/belanja-modal/usulan/proposal";
import { getItems, getProposal } from "@/lib/service";
import Breadcrumbs from "@/components/breadcrumbs";

export default async function Usulan({ params }: {params: { slug: string } }) {
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
          { label: 'Usulan', href: `/belanja-modal/usulan/${slug}`, active: true }
        ]}
      />
      <h1 className="text-3xl font-bold tracking-tight">Usulan</h1>
      <div className="my-6">
        <Proposal items={items} slug={slug} token={token} office={office} year={year}/>
      </div>
    </>
  );
}
