import { Card } from "@/components/ui/card";
import Link from "next/link";
import { getProposal } from "@/services/user";
import { DocumentUpload, TableDocument } from "iconsax-react";
import { Status } from "@/components/status";

export default async function BelanjaModalCard({ uuid, year, user, status }: { uuid:string, year:string, user:string, status:string}) {

  return (
    <Card className="w-full mb-4">
      <div className="p-6 md:p-8">
        <div className="space-y-4 md:space-y-6">
          <div className="flex justify-between">
            <div className="space-y-2">
              <h4 className="leading-none">{user}</h4>
              <div className="text-base md:text-xl text-textweak">
                Tahun Anggaran {year}
              </div>
            </div>
            <div>
              <Status statuss={status} />
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            <Link
              href={`/belanja-modal/usulan/${uuid}`}
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
              href={`/belanja-modal/penyesuaian/${uuid}`}
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
        </div>
      </div>
    </Card>
  );
}
