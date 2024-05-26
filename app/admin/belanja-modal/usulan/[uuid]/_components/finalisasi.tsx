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
import { useState } from "react";
import { Icons } from "@/components/icons";
import { postFinalisasi } from "@/lib/service-admin";

export default function Finalisasi({ uuid, token }: { uuid:string, token:string }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit() {
    setIsLoading(true);
    try {
      const res = await postFinalisasi(token, uuid);
      console.log(res);
      console.log(res.message);
      if (res.ok) {
        setIsLoading(false);
        setOpen(false);
        router.refresh();
        toast({
          title: "Penyesuaian RAB berhasil difinalisasi",
        });
      } else {
        setIsLoading(false);
        setOpen(false);
        toast({
          title: "Gagal memfinalisasi penyesuaian RAB",
          description: res.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <TickCircle className="mr-2 w-5 h-5" />
            Finalisasi
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] space-y-4">
        <DialogHeader> 
          <h5>Finalisasi penyesuaian RAB?</h5>
        </DialogHeader>
        <div className="flex justify-start gap-4">
          <Button disabled={isLoading} onClick={onSubmit}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Finalisasi
          </Button>
          <DialogClose asChild>
            <Button variant="secondary" >Batal</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
