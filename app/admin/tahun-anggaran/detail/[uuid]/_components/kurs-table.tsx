import { columns } from "./table/column";
import { getCurrency, getKurs, getDetailYear } from "@/services/admin";
import { DataTable } from "./table/data-table";
import { Card } from "@/components/ui/card";
import { StatussTahun } from "@/components/status"
import { Button } from "@/components/ui/button";
import { UbahDeadline } from "./ubah-deadline";
import { UbahStatus } from "./ubah-status";

export async function KursTable ({ token, uuid } : { token:string, uuid:string }) {
  const kurs = await getKurs(token, uuid)
  const data = kurs?.data;
  const currency = await getCurrency(token);
  const year = await getDetailYear(token, uuid);
  console.log(data);
  console.log(year);
  return (
    <div>
      <h3>Tahun Anggaran {kurs?.message}</h3>
      <div className="border-t border-border h-[1px] mt-8"></div>
      <div className="py-12 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-end">
          <h4>Detail</h4>
          <div className="flex gap-4">
            <UbahDeadline token={token} uuid={uuid}/>
            <UbahStatus token={token} uuid={uuid}/>
          </div>
        </div>
        <Card className="p-8">
          <div className="grid grid-cols-3">
            <div className="col-span-1 space-y-1">
              <p className="text-textweak">Status</p>
              <StatussTahun statuss={year?.is_active}/>
            </div>
            <div className="col-span-1 space-y-1">
              <p className="text-textweak">Deadline</p>
              <p className="font-semibold">{year?.deadlineProposal}</p>
            </div>
            <div className="col-span-1 space-y-1">
              <p className="text-textweak">Jumlah Usulan</p>
              <p className="font-semibold">{year?.proposalCount}</p>
            </div>
          </div>
        </Card>
      </div>
      <div className="border-t border-border h-[1px]"></div>
      <div className="py-12 space-y-6">
        <h4>Kurs</h4>
        <DataTable columns={columns} data={data} currency={currency} uuid={uuid}/>
      </div>
    </div>
  );
}
