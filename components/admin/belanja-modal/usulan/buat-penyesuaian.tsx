"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { rabToApproved } from "@/lib/service-admin";

export default function BuatPenyesuaian({ uuid, token } : { uuid: string, token: string }) {

  const buatDipa = async () => {
    try {
      const res = await rabToApproved(token, uuid)
      console.log(res)
      window.location.reload();
    } catch (error) {
      // setError('File is invalid');
    } finally {
      // setIsLoading(false);
    }
  };

  return (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline">Buat Penyesuaian</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Buat Penyesuaian RAB untuk Usulan ini</DialogTitle>
      </DialogHeader>
      <DialogFooter className="sm:justify-between">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Batal
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="button" onClick={() => buatDipa()}>
            Lanjutkan
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}