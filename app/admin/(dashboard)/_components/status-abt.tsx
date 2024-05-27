import { Clock, CloseCircle, InfoCircle, TickCircle } from "iconsax-react";

export default function StatusAbt({ data } : { data: any }) {
  return (
    <>
      <div className="rounded-xl border bg-card text-card-foreground p-6 space-y-6">
        <div className="text-xl font-semibold">Status Pengajuan ABT</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1 space-y-4">
            <div className="border border-strokeweak rounded-xl py-4 space-y-2">
              <div className="flex justify-center">
                <div className="flex items-center rounded-full py-1 px-2 gap-1 bg-amber/5 border border-amber/20 text-amber">
                  <InfoCircle className="h-4 w-4"/><span className="text-sm">Diajukan</span>
                </div>
              </div>
              <h3 className="text-center">{data?.submitted}</h3>
            </div>
            <div className="border border-strokeweak rounded-xl py-4 space-y-2">
              <div className="flex justify-center">
                <div className="flex items-center rounded-full py-1 px-2 gap-1 bg-red/5 border border-red/20 text-red">
                  <CloseCircle className="h-4 w-4"/><span className="text-sm">Ditolak</span>
                </div>
              </div>
              <h3 className="text-center">{data?.rejected}</h3>
            </div>
          </div>
          <div className="col-span-1 space-y-4">
            <div className="border border-strokeweak rounded-xl py-4 space-y-2">
              <div className="flex justify-center">
                <div className="flex items-center rounded-full py-1 px-2 gap-1 bg-green/5 border border-green/20 text-green">
                  <Clock className="h-4 w-4"/><span className="text-sm">Diproses</span>
                </div>
              </div>
              <h3 className="text-center">{data?.onProccess}</h3>
            </div>
            <div className="border border-strokeweak rounded-xl py-4 space-y-2">
              <div className="flex justify-center">
                <div className="flex items-center rounded-full py-1 px-2 gap-1 bg-blue/5 border border-blue/20 text-blue">
                  <TickCircle className="h-4 w-4"/><span className="text-sm">Diterima</span>
                </div>
              </div>
              <h3 className="text-center">{data?.accepted}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
