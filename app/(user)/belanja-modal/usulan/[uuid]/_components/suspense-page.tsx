import { getAccount, getFilesPath, getItems, getKurs, getProposalData } from "@/lib/service";
import Brafaks from "./brafaks";
import RAB from "./rab";

export default async function SuspensePage({
  uuid,
  token,
}: {
  uuid: string;
  token: string;
}) {
  const proposal = await getProposalData(token);
  const files = await getFilesPath(token, uuid);
  const account = await getAccount(token);
  const kurs = await getKurs(token, uuid);
  const items = await proposal?.items;
  const currency = await proposal?.currency;
  console.log(proposal)
  return (
    <div className="space-y-6">
      <Brafaks uuid={uuid} token={token} files={files} />
      <RAB uuid={uuid} token={token} items={items} account={account} currency={currency} kurs={kurs}/>
    </div>
  );
}
