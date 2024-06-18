import { getProfil } from "@/services/auth";
import { Notification } from "@/lib/definitions";
import { Card } from "@/components/ui/card";
import { UbahPassword } from "./ubah-password";
import { UbahProfil } from "./ubah-profil";

export async function SuspensePage ({ token } : { token:string }) {
  const data = await getProfil(token)

  return (
    <div>
      <Card className="p-4 space-y-2">
        <div>Detail Profil</div>
        <div>
          <div className="text-textweak">Username</div>
          <div className="font-semibold">{data?.username}</div>
        </div>
        <div>
          <div className="text-textweak">Nama</div>
          <div className="font-semibold">{data?.name}</div>
        </div>
        <div>
          <div className="text-textweak">Peran</div>
          <div className="font-semibold">{data?.role}</div>
        </div>
      </Card>
        <UbahProfil/>
        <UbahPassword/>
    </div>
  )
}