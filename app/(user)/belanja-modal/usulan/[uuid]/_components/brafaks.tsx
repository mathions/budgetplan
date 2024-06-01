import { Card } from "@/components/ui/card";
import { UploadFile } from "./upload-file";
import Berkas from "./berkas";

export default function Brafaks({ uuid, token, files = [] } : { uuid: string, token: string, files: any }) {

  return (
    <Card className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-end">
        <h4>Dokumen Brafaks</h4>
        <UploadFile uuid={uuid} token={token}/>
      </div>
      <div>
        <div className="grid grid-cols-4 gap-4">
          {files.map((file: { uuid: string; path: string; }) => (
            <Berkas key={file.uuid} token={token} uuidProposal={uuid} uuidFile={file.uuid} path={file.path} />
          ))}
        </div>
      </div>
    </Card>
  );
}
