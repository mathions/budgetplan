import { Card } from '@/components/ui/card';
import { Status } from "@/components/status";

const tags = [
  {
    id: "tag1",
    label: "Penyampaian usulan telah sesuai",
  },
  {
    id: "tag2",
    label: "Terdapat kesalahan penulisan pada brafaks",
  },
  {
    id: "tag3",
    label: "Rencana anggaran biaya terlalu besar",
  },
  {
    id: "tag4",
    label: "Lampiran pendukung tidak lengkap",
  },
] as const;

export default function Detail({proposal} : {proposal: any}) {
  const tagLabels = proposal?.tag ? proposal.tag.map((tagId: string) => tags.find(t => t.id === tagId)?.label) : [];

  return(
    <div className="space-y-6">
      <h4>Rincian</h4>
      <Card className="p-8 space-y-2">
        <div className="grid grid-cols-3">
          <div className="col-span-1 space-y-1">
            <p className="text-textweak">Satuan Kerja</p>
            <p className="font-semibold">{proposal?.office}</p>
          </div>
          <div className="col-span-1 space-y-1">
            <p className="text-textweak">Tahun Anggaran</p>
            <p className="font-semibold">{proposal?.year}</p>
          </div>
          <div className="col-span-1 space-y-1">
            <p className="text-textweak">Status</p>
            <div className="flex"><Status statuss={proposal?.status} /></div>
          </div>
        </div>
        <div className="grid grid-cols-3">
          <div className="col-span-1 space-y-1">
            <p className="text-textweak">Deadline</p>
            <p className="font-semibold">{proposal?.deadline}</p>
          </div>
          <div className="col-span-1 space-y-1">
            <div className="text-textweak">Tag</div>
            {tagLabels && tagLabels.map((label: string, index: number) => <div key={index} className="font-semibold">{label}</div>)}
          </div>
          <div className="col-span-1 space-y-1">
            <div className="text-textweak">Catatan</div>
            <div className="font-semibold">{proposal?.note}</div>
          </div>
        </div>
      </Card>
    </div>
  )
}