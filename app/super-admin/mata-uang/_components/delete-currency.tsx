"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Add, Trash } from "iconsax-react";
import { toast } from "@/components/ui/use-toast";
import { deleteCurrency } from "@/lib/service-super-admin";
import { useState } from "react";
import { Icons } from "@/components/icons";

export function DeleteCurrency({ uuid }: { uuid:string }) {
  const tkn = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3OGQyMzUyMi02YTQ4LTRjNGEtYjI3Yi05YmM2M2RhYTYzNDYiLCJ1c2VybmFtZSI6InVtdW0iLCJ1c2VyUm9sZSI6ImFkbWluIiwiaWF0IjoxNzE1OTkzNDQ0LCJleHAiOjE3MTYwNzk4NDR9.OFVl9xqRUWP8HwUU7w1xM-mSQ_i-74AsdLw9m9gKzwA"
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    setIsLoading(true);
    try {
      const res = await deleteCurrency(tkn, uuid);
      console.log(res);
      if (res.status === 200) {
        setIsLoading(false);
        setOpen(false);
        window.location.reload();
        toast({
          title: "Mata uang berhasil dihapus",
        });
      } else {
        setIsLoading(false);
        setOpen(false);
        toast({
          title: "Gagal menghapus mata uang",
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
          <h4>Hapus mata uang ?</h4>
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
