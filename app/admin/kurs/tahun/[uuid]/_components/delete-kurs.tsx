"use client";
import { useSession } from "next-auth/react";
import { useRouter} from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Trash } from "iconsax-react";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Icons } from "@/components/icons";
import { deleteKurs } from "@/lib/service-admin";

export function DeleteKurs({ uuid }: { uuid:string }) {
  const { data: session }: { data: any } = useSession();
  const token = session?.user?.token;
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setIsLoading(true);
    try {
      const res = await deleteKurs(token, uuid);
      console.log(res);
      if (res.status === 200) {
        setIsLoading(false);
        setOpen(false);
        router.refresh();
        toast({
          title: "Kurs berhasil dihapus",
        });
      } else {
        setIsLoading(false);
        setOpen(false);
        toast({
          title: "Gagal menghapus kurs",
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
        <Button variant="link" className="p-2">
          <Trash className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] space-y-4">
        <DialogHeader>
          <h4>Hapus kurs?</h4>
        </DialogHeader>
        <div className="flex justify-start gap-4">
          <Button disabled={isLoading} onClick={handleDelete} variant="destructive">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Hapus
          </Button>
          <DialogClose asChild>
            <Button variant="secondary" className="border-destructive text-destructive">Batal</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
