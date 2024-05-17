export default function StatusAbt() {
  return (
    <>
      <div className="rounded-xl border bg-card text-card-foreground p-6 space-y-6">
        <div className="text-xl font-semibold">Status Pengajuan ABT</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1 space-y-4">
            <div className="border border-strokeweak rounded-xl py-4 space-y-2">
              <div className="text-center">Diajukan</div>
              <h3 className="text-center">4</h3>
            </div>
            <div className="border border-strokeweak rounded-xl py-4 space-y-2">
              <div className="text-center">Ditolak</div>
              <h3 className="text-center">1</h3>
            </div>
          </div>
          <div className="col-span-1 space-y-4">
            <div className="border border-strokeweak rounded-xl py-4 space-y-2">
              <div className="text-center">Diproses</div>
              <h3 className="text-center">2</h3>
            </div>
            <div className="border border-strokeweak rounded-xl py-4 space-y-2">
              <div className="text-center">Diterima</div>
              <h3 className="text-center">8</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
