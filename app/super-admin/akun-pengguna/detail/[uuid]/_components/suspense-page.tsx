import { getDetailUser } from "@/services/super-admin";
import { Profil } from "./profil";
import { Autentikasi } from "./autentikasi"
import { Status } from "./status"
import { Hapus } from "./hapus"

export async function SuspensePage ({ token, uuid } : { token:string, uuid:string }) {
  const user = await getDetailUser(token, uuid)
  console.log(user)
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="col-span-1">
          <Profil username={user?.username} name={user?.name} role={user?.role} office={user?.office} office_code={user?.office_code} country={user?.country} area={user?.area} uuid={user?.uuid}/>
        </div>
        <div className="col-span-1 space-y-8">
          <Status uuid={uuid} status={user?.active}/>
          <Autentikasi uuid={uuid} />
          {/* <Hapus uuid={uuid} /> */}
        </div>
      </div>
    </div>
  );
}
