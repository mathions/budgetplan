import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { getProposal } from "@/lib/service";
import { DocumentUpload, TableDocument } from "iconsax-react";

export default async function BelanjaModalCard({ token }: { token: any }) {
  const data = await getProposal(token);

  return (
    <Card className="w-full">
      <div className="p-6 md:p-8">
        <div className="space-y-4 md:space-y-6">
          <h4>Penyampaian Usulan Kebutuhan Belanja Modal</h4>
          <div className="flex justify-between">
            <div className="space-y-1">
              <div className="text-xl text-textstrong font-semibold">
                {data?.office}KBRI Kuala Lumpur
              </div>
              <div className="text-xl text-textweak">
                Tahun Anggaran {data?.year} 2025
              </div>
            </div>
            <div>status</div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            <Link
              href={`/belanja-modal/usulan/${data?.uuid}`}
              className="w-fit h-fit"
            >
              <Card className="p-6 space-y-2">
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
              href={`/belanja-modal/usulan/${data?.uuid}`}
              className="w-fit h-fit"
            >
              <Card className="p-6 space-y-2">
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
