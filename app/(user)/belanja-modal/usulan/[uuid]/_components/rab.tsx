import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UploadFile } from "./upload-file";
import { DirectInbox } from "iconsax-react";

export default function RAB() {
  return (
    <Card className="p-8">
      <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-end">
        <h4>Rencana Anggaran Biaya</h4>
        <Button variant="secondary"><DirectInbox className="mr-2 w-5 h-5" />Simpan</Button>
      </div>
    </Card>
  );
}
