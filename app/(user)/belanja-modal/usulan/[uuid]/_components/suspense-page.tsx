import { getAccount, getFilesPath, getItems, getProposal, getKurs } from "@/lib/service";
import Brafaks from "./brafaks";
import RAB from "./rab";
import { Card } from "@/components/ui/card";
import Proposal from "./proposal";

export default async function SuspensePage({
  uuid,
  token,
}: {
  uuid: string;
  token: string;
}) {
  const proposal = await getProposal(token);
  const files = await getFilesPath(token, uuid);
  const items = await getItems(token, uuid);
  const account = await getAccount(token);
  const currency = proposal?.currency;
  const kurs = await getKurs(token, uuid);
  console.log(proposal)
  return (
    <div className="space-y-6">
      <Brafaks uuid={uuid} token={token} files={files} />
      <RAB uuid={uuid} token={token} items={items} account={account} currency={currency} kurs={kurs}/>
    </div>
  );
}
