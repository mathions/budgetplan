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
import { Send2 } from "iconsax-react";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Icons } from "@/components/icons";
import { updateStatus } from "@/lib/service";

export function Ajukan({ uuid, token }: { uuid:string, token:string }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleUpdate() {
    setIsLoading(true);
    try {
      const res = await updateStatus(token, uuid);
      console.log(res);
      if (res.status === 200) {
        setIsLoading(false);
        setOpen(false);
        router.refresh();
        toast({
          title: "Penyampaian usulan belanja modal berhasil diajukan",
        });
      } else {
        setIsLoading(false);
        setOpen(false);
        toast({
          title: "Gagal mengajukan penyampaian usulan belanja modal",
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
          <Send2 className="mr-2 w-5 h-5" />
            Ajukan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] space-y-4">
        <DialogHeader>
          <h5>Ajukan penyampaian usulan kebutuhan belanja modal?</h5>
        </DialogHeader>
        <div className="flex justify-start gap-4">
          <Button disabled={isLoading} onClick={handleUpdate}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Ajukan
          </Button>
          <DialogClose asChild>
            <Button variant="secondary" >Batal</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
