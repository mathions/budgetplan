import { Card } from '@/components/ui/card';

export default function Detail({proposal} : {proposal: any}) {
  return(
    <Card className="p-8 space-y-2">
      <div className="">
        <div className="text-textweak">Satuan Kerja</div>
        <div className="font-semibold">{proposal?.office}</div>
      </div>
      <div>
        <div className="text-textweak">Tahun Anggaran</div>
        <div className="font-semibold">{proposal?.year}</div>
      </div>
      <div>
        <div className="text-textweak">Status</div>
        <div className="font-semibold">{proposal?.status}</div>
      </div>
      <div>
        <div className="text-textweak">Umpan Balik</div>
        <div className="font-semibold">{proposal?.tag}</div>
        <div className="font-semibold">{proposal?.note}</div>
        <div className="font-semibold">Terdapat kekurangan pada brafaks</div>
      </div>
    </Card>
  )
}