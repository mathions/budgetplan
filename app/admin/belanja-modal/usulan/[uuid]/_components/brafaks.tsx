import { Card } from "@/components/ui/card";
import Berkas from "./berkas";

export default function Brafaks({ uuid, token, files } : { uuid: string, token: string, files: any }) {

  return (
    <div className="space-y-6">
      <h4>Dokumen Brafaks</h4>
      <Card className="p-8 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {files.map((file: { uuid: string; path: string; }) => (
            <Berkas key={file.uuid} token={token} uuidProposal={uuid} uuidFile={file.uuid} path={file.path} />
          ))}
        </div>
      </Card>
    </div>
  );
}
