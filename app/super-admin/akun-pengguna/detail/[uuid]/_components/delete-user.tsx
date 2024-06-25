"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash } from "iconsax-react";
import { deleteUser } from "@/services/super-admin";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogClose, } from "@/components/ui/dialog";
import { useState } from "react";
import { Icons } from "@/components/icons";

export function DeleteUser({ uuid }: { uuid: string }) {
  const { data: session }: { data: any } = useSession();
  const token = session?.user?.token;
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setIsLoading(true);
    try {
      const res = await deleteUser(token, uuid);
      console.log(res);
      if (res.ok) {
        setIsLoading(false);
        setOpen(false);
        router.refresh();
        toast({
          title: "Akun pengguna berhasil dihapus",
        });
      } else {
        setIsLoading(false);
        setOpen(false);
        toast({
          title: "Gagal menghapus akun pengguna",
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
        <Button variant="destructive">
          Hapus Akun Pengguna
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <h4>Hapus akun pengguna?</h4>
        </DialogHeader>
        <div className="flex justify-start gap-4 pt-2">
          <Button
            disabled={isLoading}
            onClick={handleDelete}
            variant="destructive"
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Hapus
          </Button>
          <DialogClose asChild>
            <Button
              variant="secondary"
              className="border-destructive text-destructive hover:bg-destructive/5"
            >
              Batal
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
