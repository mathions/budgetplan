import { getItems, getDetailProposal, getFile} from "@/lib/service-admin";
import Detail from "./detail";
import RAB from "./rab";
import Brafaks from "./brafaks";

export default async function SuspensePage({
  uuid,
  token,
}: {
  uuid: string;
  token: string;
}) {
  const proposal = await getDetailProposal(token, uuid)
  const items = await getItems(token, uuid)
  const files = proposal?.files;
  const currency = proposal?.currency;

  return (
    <div className="space-y-6">
      <Detail proposal={proposal}/>
      <Brafaks uuid={uuid} token={token} files={files} />
      <RAB uuid={uuid} token={token} items={items} currency={currency}/>
    </div>
  );
}
