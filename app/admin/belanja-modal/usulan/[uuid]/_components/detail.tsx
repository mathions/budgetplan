import { Card } from '@/components/ui/card';

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
    <Card className="p-8 space-y-2">
      <div>
        <p className="text-textweak">Satuan Kerja</p>
        <p className="font-semibold">{proposal?.office}</p>
      </div>
      <div>
        <p className="text-textweak">Tahun Anggaran</p>
        <p className="font-semibold">{proposal?.year}</p>
      </div>
      <div>
        <p className="text-textweak">Status</p>
        <p className="font-semibold">{proposal?.status}</p>
      </div>
      <div>
        <div className="text-textweak">Tag</div>
        {tagLabels && tagLabels.map((label: string, index: number) => <div key={index} className="font-semibold">{label}</div>)}
      </div>
      <div>
        <div className="text-textweak">Catatan</div>
        <div className="font-semibold">{proposal?.note}</div>
      </div>
    </Card>
  )
}