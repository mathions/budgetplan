import { getProfil } from "@/services/auth";
import { FotoProfil } from "./foto-profil";
import { Profil } from "./profil";
import { Autentikasi } from "./autentikasi";

export async function SuspensePage ({ token } : { token:string }) {
  const user = await getProfil(token)
  console.log(user)
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="col-span-1">
          <Profil username={user?.username} name={user?.name} role={user?.role} office={user?.office} office_code={user?.office_code} country={user?.country} area={user?.area} uuid={user?.uuid}/>
        </div>
        <div className="col-span-1 space-y-8">
          <FotoProfil image={user?.image} />
          <Autentikasi />
        </div>
      </div>
    </div>
  )
}