export default function Rab() {
  return (
    <>
      <div className="rounded-xl border bg-card text-card-foreground p-6 space-y-6">
        <div className=" text-xl font-semibold">Rencana Anggaran Biaya</div>
        <div className="space-y-4">
          <div className="border border-strokeweak rounded-xl px-4 py-5 space-y-2">
            <div className="text-textweak">
              Layanan Sarana dan Prasarana Internal
            </div>
            <h3>Rp 13.000.000.000</h3>
          </div>
          <div className="md:grid grid-cols-2 gap-4">
            <div className="col-span-1 space-y-4">
              <div className="border border-strokeweak rounded-xl px-4 py-5 space-y-2">
                <div className="text-textweak">Kendaraan Bermotor</div>
                <h5>Rp 2.700.000.000</h5>
              </div>
              <div className="border border-strokeweak rounded-xl px-4 py-5 space-y-2">
                <div className="text-textweak">Perangkat Pengolah Data dan Komunikasi</div>
                <h5>Rp 1.200.000.000</h5>
              </div>
            </div>
            <div className="col-span-1 space-y-4">
              <div className="border border-strokeweak rounded-xl px-4 py-5 space-y-2">
                <div className="text-textweak">Peralatan Fasilitas Perkantoran</div>
                <h5>Rp 600.000.000</h5>
              </div>
              <div className="border border-strokeweak rounded-xl px-4 py-5 space-y-2">
                <div className="text-textweak">Pembangunan Gedung dan Bangunan</div>
                <h5>Rp 8.500.000.000</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
