"use client"
// import { useRouter } from 'next/router';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { useState } from "react";
import { editStatusBelmod } from "@/lib/service-admin";

export default function UbahStatus({ uuid, token } : { uuid: string, token: string }) {
  const [status, setStatus] = useState('');
  const editStatus = async (status : string) => {
    try {
      const res = await editStatusBelmod(token, uuid, status)
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
      <Button>Ubah Status</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Status Pengajuan Usulan Belanja Modal</DialogTitle>
        <DialogDescription>
          perihal
        </DialogDescription>
      </DialogHeader>
      <Select onValueChange={setStatus}>
        <SelectTrigger id="status">
          <SelectValue placeholder="status" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="4">Diterima</SelectItem>
          <SelectItem value="5">Ditolak</SelectItem>
        </SelectContent>
      </Select>
      <DialogFooter className="sm:justify-end">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Batal
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="button" onClick={() => editStatus(status)}>
            Simpan
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}