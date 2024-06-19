import { getProfil } from "@/services/auth";
import { Notification } from "@/lib/definitions";
import { Card } from "@/components/ui/card";
import { UbahPassword } from "./ubah-password";
import { UbahProfil } from "./ubah-profil";

export async function SuspensePage ({ token } : { token:string }) {
  const data = await getProfil(token)
  console.log(data)
  return (
    <div>
      <Card className="p-8 space-y-6">
        <div className="grid grid-cols-2">
          <div className="col-span-1 space-y-2">
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
            <div>
            <div className="text-textweak">Satuan Kerja</div>
            <div className="font-semibold">{data?.office}</div>
            </div>
          </div>
          <div className="col-span-1 space-y-2">
            <div>
              <div className="text-textweak">Kode Satuan Kerja</div>
              <div className="font-semibold">{data?.office_code}</div>
            </div>
            <div>
              <div className="text-textweak">Negara</div>
              <div className="font-semibold">{data?.country}</div>
            </div>
            <div>
              <div className="text-textweak">Wilayah</div>
              <div className="font-semibold">{data?.area}</div>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <UbahProfil key={data.uuid} username={data.username} name={data.name} office={data.office} office_code={data.office_code} country={data.country} area={data.area}/>
          <UbahPassword/>
        </div>
      </Card>
    </div>
  )
}