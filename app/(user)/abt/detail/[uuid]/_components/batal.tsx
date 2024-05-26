"use client";
import { useRouter} from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Copy, TickCircle } from "iconsax-react";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Icons } from "@/components/icons";
import { postFinalisasi } from "@/lib/service-admin";
import { deleteAbt } from "@/lib/service";

export default function Batal({ uuid, token }: { uuid:string, token:string }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit() {
    setIsLoading(true);
    try {
      const res = await deleteAbt(token, uuid);
      console.log(res);
      console.log(res.message);
      if (res.ok) {
        setIsLoading(false);
        setOpen(false);
        router.push("/abt");
        router.refresh();
        toast({
          title: "Pengajuan ABT berhasil dibatalkan",
        });
      } else {
        setIsLoading(false);
        setOpen(false);
        toast({
          title: "Gagal membatalkan pengajuan ABT",
          description: res.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // useEffect(() => {
  //   router.prefetch('abt')
  // }, [router])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="border-destructive text-destructive">
            Batalkan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader> 
          <h5>Batalkan pengajuan ABT?</h5>
        </DialogHeader>
        <div className="flex justify-start gap-4">
          <Button disabled={isLoading} onClick={onSubmit} variant="destructive">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Konfirmasi
          </Button>
          <DialogClose asChild>
            <Button variant="secondary" className="border-destructive text-destructive">Tidak</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
