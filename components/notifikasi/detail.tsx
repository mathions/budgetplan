"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogClose, } from "@/components/ui/dialog";
import { useState } from "react";

export function AddCurrency() {
  const { data: session }: { data: any } = useSession();
  const token = session?.user?.token;
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          Tambah
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <h4>Tambah Mata Uang</h4>
        </DialogHeader>
              <DialogClose asChild>
                <Button variant="secondary">Batal</Button>
              </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
