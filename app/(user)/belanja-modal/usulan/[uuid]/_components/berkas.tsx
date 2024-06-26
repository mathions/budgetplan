"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getFile, deleteFile } from "@/services/user";
import { toast } from "@/components/ui/use-toast";

export default function Berkas({
  token,
  uuidProposal,
  uuidFile,
  path,
}: {
  token: string;
  uuidProposal: string;
  uuidFile: string;
  path: string;
}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const truncatedPath = path.length > 24 ? `${path.slice(0, 24)}...` : path;

  async function handleDownload() {
    setIsLoading(true);
    try {
      const res = await getFile(token, uuidProposal, uuidFile);
      console.log(res);
      if (res.ok) {
        const pdfBlob = await res.blob();
        const url = window.URL.createObjectURL(new Blob([pdfBlob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", path);
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

  async function handleDelete() {
    setIsLoading(true);
    try {
      const res = await deleteFile(token, uuidProposal, uuidFile);
      console.log(res);
      if (res.ok) {
        setIsLoading(false);
        router.refresh();
        toast({
          title: "Berkas berhasil dihapus",
        });
      } else {
        setIsLoading(false);
        toast({
          title: "Gagal menghapus berkas",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="col-span-1 border border-strokestrong rounded-xl px-4 py-3 hover:bg-fill">
      <div className="flex justify-between items-center">
        <p>{truncatedPath}</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <MoreVertical className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Button
                variant="ghost"
                className="w-full"
                onClick={handleDownload}
              >
                Unduh
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                variant="ghost"
                className="w-full"
                onClick={handleDelete}
              >
                Hapus
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
