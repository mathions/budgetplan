import { getDetailAbt } from "@/lib/service";
import { PdfViewer } from "./pdf-viewer";

export default async function SuspensePage({ uuid, token, }: { uuid: string; token: string; }) {
  const detail = await getDetailAbt(token, uuid)
  console.log(detail)

  return (
    <div className="space-y-6">
      
      <PdfViewer uuid={uuid} token={token} />
    </div>
  );
}
