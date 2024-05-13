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
import { Add, ExportCurve } from "iconsax-react"

export function UploadFile() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary"><ExportCurve className="mr-2 h-5 w-5"/>Unggah Berkas</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <h4>Unggah Berkas</h4>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="dokumen">
              Dokumen Brafaks
            </Label>
            <Input
              id="file"
              type="file"
            />
          </div>
        </div>
        <div className="flex justify-start gap-4">
          <Button type="submit">Unggah</Button>
          <Button variant="secondary">Batal</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
