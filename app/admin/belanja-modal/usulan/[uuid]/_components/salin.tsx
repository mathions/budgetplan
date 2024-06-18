"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogClose, } from "@/components/ui/dialog";
import { Copy } from "iconsax-react";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Icons } from "@/components/icons";
import { postSalinRab } from "@/services/admin";

export function Salin({ uuid, token }: { uuid: string; token: string }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit() {
    setIsLoading(true);
    try {
      const res = await postSalinRab(token, uuid);
      console.log(res);
      console.log(res.message);
      if (res.ok) {
        setIsLoading(false);
        setOpen(false);
        router.refresh();
        toast({
          title: "Data RAB berhasil disalin",
        });
      } else {
        setIsLoading(false);
        setOpen(false);
        toast({
          title: "Gagal menyalin data RAB",
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
        <Button variant="secondary">
          <Copy className="mr-2 w-5 h-5" />
          Salin
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] space-y-4">
        <DialogHeader>
          <h5>Salin data RAB dari penyampaian usulan?</h5>
        </DialogHeader>
        <div className="flex justify-start gap-4">
          <Button disabled={isLoading} onClick={onSubmit}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Salin
          </Button>
          <DialogClose asChild>
            <Button variant="secondary">Batal</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
