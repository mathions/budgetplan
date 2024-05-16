import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Proposal from "@/app/(user)/belanja-modal/usulan/[uuid]/_components/proposal";
import { getFilesPath, getItems, getProposal } from "@/lib/service";
import Breadcrumbs from "@/components/breadcrumbs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DirectInbox, Send2 } from "iconsax-react";
import Brafaks from "./_components/brafaks";
import RAB from "./_components/rab";

export default async function Usulan({ params }: { params: { uuid: string } }) {
  const uuid = params.uuid;
  const session: any = await getServerSession(authOptions);
  const token = session?.user?.token;
  const proposal = await getProposal(token);
  const files = await getFilesPath(token, uuid);
  const items = await getItems(token, uuid);
  console.log(proposal);
  console.log(files);

  if (!session) {
    return redirect("/auth/login");
  }
  return (
    <div className="mx-auto px-4 md:px-20 py-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Beranda", href: "/beranda" },
          { label: "Belanja Modal", href: "/belanja-modal" },
          {
            label: "Penyampaian Usulan",
            href: `/belanja-modal/usulan/${uuid}`,
            active: true,
          },
        ]}
      />
      <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-end">
        <h3>Penyampaian Usulan</h3>
        <div className="flex gap-4">
          <Button variant="secondary">
            <DirectInbox className="mr-2 w-5 h-5" />
            Simpan
          </Button>
          <Button variant="default">
            <Send2 className="mr-2 w-5 h-5" />
            Ajukan
          </Button>
        </div>
      </div>
      <div className="my-6 space-y-4">
        <Brafaks uuid={uuid} token={token} files={files}/>
        <RAB/>
        <Card className="w-full p-8">
          <Proposal uuid={uuid} token={token} files={files} items={items} />
        </Card>
      </div>
    </div>
  );
}
