import { getAccount, getFilesPath, getKurs, getProposalData } from "@/services/user";
import Brafaks from "./brafaks";
import RAB from "./rab";
import Detail from "./detail";

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
  console.log(proposal);
  return (
    <div className="space-y-12">
      <div className="border-t border-border h-[1px]"></div>
      <Detail proposal={proposal} />
      <div className="border-t border-border h-[1px]"></div>
      <Brafaks uuid={uuid} token={token} files={files} />
      <div className="border-t border-border h-[1px]"></div>
      <RAB uuid={uuid} token={token} items={items} account={account} currency={currency} kurs={kurs}/>
    </div>
  );
}
