"use client";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogClose, } from "@/components/ui/dialog";
import { Add, Trash } from "iconsax-react";
import { toast } from "@/components/ui/use-toast";
import { deleteAccount } from "@/lib/service-super-admin";
import { useState } from "react";
import { Icons } from "@/components/icons";

export function DeleteAccount({ uuid }: { uuid:string }) {
  const { data: session }: { data: any } = useSession();
  const token = session?.user?.token;
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  async function handleDelete() {
    setIsLoading(true);
    try {
      const res = await deleteAccount(token, uuid);
      console.log(res);
      if (res.ok) {
        setIsLoading(false);
        setOpen(false);
        router.refresh();
        toast({
          title: "Kode akun berhasil dihapus",
        });
      } else {
        setIsLoading(false);
        setOpen(false);
        toast({
          title: "Gagal menghapus kode akun",
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
        <Button variant="link" className="p-2">
          <Trash className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <h4>Hapus kode akun?</h4>
        </DialogHeader>
        <div className="flex justify-start gap-4 pt-2">
          <Button disabled={isLoading} onClick={handleDelete} variant="destructive">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Hapus
          </Button>
          <DialogClose asChild>
            <Button variant="secondary" className="border-destructive text-destructive hover:bg-destructive/5">Batal</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
