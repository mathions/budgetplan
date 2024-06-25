import { getItems, getDetailProposal, getPenyesuaian, getAccount } from "@/services/admin";
import Detail from "./detail";
import RAB from "./rab";
import Brafaks from "./brafaks";
import BeriKeputusan from "./beri-keputusan";
import PenyesuaianRAB from "./penyesuaian-rab";
import Finalisasi from "./finalisasi";

export default async function SuspensePage({
  uuid,
  token,
}: {
  uuid: string;
  token: string;
}) {
  const proposal = await getDetailProposal(token, uuid);
  const usulan_items = await getItems(token, uuid);
  const usulan_files = proposal?.files;
  const usulan_currency = proposal?.currency;
  const account = await getAccount(token);
  const penyesuaian = await getPenyesuaian(token, uuid);
  const items_penyesuaian = penyesuaian?.data?.items;
  const currency_penyesuian = penyesuaian?.data?.kurs;
  console.log(penyesuaian);
  console.log(proposal);
  return (
    <div className="space-y-8">
      <div className="border-t border-border h-[1px]"></div>
      <Detail proposal={proposal} />
      <div className="border-t border-border h-[1px]"></div>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-end">
          <h4>Penyampaian Usulan</h4>
          <BeriKeputusan token={token} uuid={uuid} />
        </div>
        <Brafaks uuid={uuid} token={token} files={usulan_files} />
        <RAB uuid={uuid} token={token} items={usulan_items} currency={usulan_currency}/>
      </div>
      <div className="border-t border-border h-[1px]"></div>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-end">
          <h4>Penyesuaian RAB</h4>
          <Finalisasi token={token} uuid={uuid} />
        </div>
        <PenyesuaianRAB uuid={uuid} token={token} account={account} items={items_penyesuaian} currency={currency_penyesuian} />
      </div>
    </div>
  );
}
