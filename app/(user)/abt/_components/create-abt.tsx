import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Add } from "iconsax-react"

export function CreateABT() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default"><Add className="mr-2 h-5 w-5"/>Buat Pengajuan</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <h4>Buat Pengajuan ABT</h4>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="perihal">
              Perihal
            </Label>
            <Textarea/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dokumen">
              Dokumen Brafaks
            </Label>
            <Input
              id="username"
              type="file"
            />
          </div>
        </div>
        <div className="flex justify-start gap-4">
          <Button type="submit">Buat Pengajuan</Button>
          <Button variant="secondary">Batal</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
