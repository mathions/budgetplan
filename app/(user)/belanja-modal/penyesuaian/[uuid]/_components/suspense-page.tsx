import { getPenyesuaian } from "@/services/user";
import RAB from "./rab";

export default async function SuspensePage({
  uuid,
  token,
}: {
  uuid: string;
  token: string;
}) {
  const proposal = await getPenyesuaian(token, uuid);
  const items = proposal?.data?.items;
  const currency = proposal?.data?.kurs;
  console.log(proposal);
  return (
    <div className="space-y-12">
      <div className="border-t border-border h-[1px]"></div>
      <RAB uuid={uuid} token={token} items={items} currency={currency} />
    </div>
  );
}
