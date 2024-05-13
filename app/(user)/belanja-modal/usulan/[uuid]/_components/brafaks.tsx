import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UploadFile } from "./upload-file";

export default function Brafaks() {
  return (
    <Card className="p-8">
      <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-end">
        <h4>Dokumen Brafaks</h4>
        <UploadFile />
      </div>
    </Card>
  );
}
