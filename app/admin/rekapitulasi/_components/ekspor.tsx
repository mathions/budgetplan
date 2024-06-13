"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter} from "next/navigation";
import { getExcelRekap } from "@/lib/service-admin";
import { toast } from "@/components/ui/use-toast";
import { ExportCircle } from "iconsax-react";

export function Ekspor({token} : {token: string}) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDownload() {
    setIsLoading(true);
    try {
      const res = await getExcelRekap(token, "2026");
      console.log(res);
      if (res.ok) {
      const pdfBlob = await res.blob();
      const url = window.URL.createObjectURL(new Blob([pdfBlob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'rekapitulasi RAB.xlsx');
      document.body.appendChild(link);
      link.click();
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
      window.URL.revokeObjectURL(url);
        setIsLoading(false);
        toast({
          title: "Berkas berhasil diunduh",
        });
      } else {
        setIsLoading(false);
        toast({
          title: "Gagal mengunduh berkas",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
return (
  <div>
    <Button onClick={handleDownload}>
      <ExportCircle className="mr-2 h-4 w-4" />
      Ekspor
    </Button>
  </div>
  )
}