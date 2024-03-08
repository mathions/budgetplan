"use client"
// import { useRouter } from 'next/router';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { useState } from "react";
import { ubahStatusBelmod } from "@/lib/service-admin";

export default function UbahStatus({ uuid, token } : { uuid: string, token: string }) {
  const [status, setStatus] = useState('');
  const editStatus = async (status : string) => {
    try {
      const res = await ubahStatusBelmod(token, uuid, status)
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
      <Button variant="outline">Ubah Status</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Status Pengajuan Usulan Belanja Modal</DialogTitle>
      </DialogHeader>
      <Select onValueChange={setStatus}>
        <SelectTrigger id="status">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="Diterima">Diterima</SelectItem>
          <SelectItem value="Ditolak">Ditolak</SelectItem>
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