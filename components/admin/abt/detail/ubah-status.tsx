"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { useState } from "react";

export default function UbahStatus() {
  const [status_id, setStatus_id] = useState('');

  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button>Ubah Status</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Status Pengajuan ABT</DialogTitle>
        <DialogDescription>
          perihal
        </DialogDescription>
      </DialogHeader>
      <Select>
        <SelectTrigger id="status">
          <SelectValue placeholder="status" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="2">Diproses</SelectItem>
          <SelectItem value="3">Ditolak</SelectItem>
          <SelectItem value="4">Diterima</SelectItem>
        </SelectContent>
      </Select>

      <DialogFooter className="sm:justify-end">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Batal
          </Button>
        </DialogClose>
          <Button type="button" >
            Simpan
          </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}