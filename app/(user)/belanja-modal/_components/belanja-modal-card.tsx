import { Card } from "@/components/ui/card";
import Link from "next/link";
import { getProposal } from "@/services/user";
import { DocumentUpload, TableDocument } from "iconsax-react";
import { Status } from "@/components/status";

export default async function BelanjaModalCard({ token }: { token: any }) {
  const res = await getProposal(token);
  const jsonResponse = await res.json();
  const data = jsonResponse.data;

  if (res.ok !== true) {
    return (
      <Card className="w-full">
        <div className="p-6 md:p-8 space-y-4 md:space-y-6">
          <h4>Penyampaian usulan belum dimulai</h4>
          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            <Card className="p-6 space-y-2 hover:shadow-md">
              <div className="p-4 rounded-full bg-primary/5 w-fit h-fit">
                <DocumentUpload className="w-[60px] h-[60px] text-primary" />
              </div>
              <h5 className="text-textstrong">Penyampaian Usulan</h5>
              <div className="text-textweak">
                Satuan Kerja mengunggah dokumen brafaks dan mengisi tabel
                Rencana Anggaran Biaya (RAB)
              </div>
            </Card>
            <Card className="p-6 space-y-2 hover:shadow-md">
              <div className="p-4 rounded-full bg-primary/5 w-fit h-fit">
                <TableDocument className="w-[60px] h-[60px] text-primary" />
              </div>
              <h5 className="text-textstrong">Hasil Penyesuaian RAB</h5>
              <div className="text-textweak">
                Biro Umum menyesuaikan Rencana Anggaran Biaya (RAB) berdasarkan
                perkiraan alokasi anggaran
              </div>
            </Card>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <div className="p-6 md:p-8">
        <div className="space-y-4 md:space-y-6">
          <div className="flex justify-between">
            <div className="space-y-2">
              <h4 className="leading-none">{data?.office}</h4>
              <div className="text-base md:text-xl text-textweak">
                Tahun Anggaran {data?.year}
              </div>
            </div>
            <div>
              <Status statuss={data?.status} />
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            <Link
              href={`/belanja-modal/usulan/${data?.uuid}`}
              className="w-fit h-fit"
            >
              <Card className="p-6 space-y-2 hover:shadow-md">
                <div className="p-4 rounded-full bg-primary/5 w-fit h-fit">
                  <DocumentUpload className="w-[60px] h-[60px] text-primary" />
                </div>
                <h5 className="text-textstrong">Penyampaian Usulan</h5>
                <div className="text-textweak">
                  Satuan Kerja mengunggah dokumen brafaks dan mengisi tabel
                  Rencana Anggaran Biaya (RAB)
                </div>
              </Card>
            </Link>
            <Link
              href={`/belanja-modal/penyesuaian/${data?.uuid}`}
              className="w-fit h-fit"
            >
              <Card className="p-6 space-y-2 hover:shadow-md">
                <div className="p-4 rounded-full bg-primary/5 w-fit h-fit">
                  <TableDocument className="w-[60px] h-[60px] text-primary" />
                </div>
                <h5 className="text-textstrong">Hasil Penyesuaian RAB</h5>
                <div className="text-textweak">
                  Biro Umum menyesuaikan Rencana Anggaran Biaya (RAB)
                  berdasarkan perkiraan alokasi anggaran
                </div>
              </Card>
            </Link>
          </div>
          {data?.note && (
            <div className="p-2 rounded-lg bg-amber/5 border border-amber/20 text-amber">
              <p>{data.note}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
