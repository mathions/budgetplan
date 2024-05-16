import Breadcrumbs from "@/components/breadcrumbs";
import { Profile2User, Note, Money } from "iconsax-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-10 py-8">
      <div className="w-full">
        <h1 className="text-center py-12">Super Admin</h1>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/super-admin/akun-pengguna" className="h-fit">
            <Card className="p-6 space-y-2">
              <div className="p-4 rounded-full bg-primary/5 w-fit h-fit">
                <Profile2User className="w-[60px] h-[60px] text-primary" />
              </div>
              <h5 className="text-textstrong">Akun Pengguna</h5>
              <div className="text-textweak">
                Kelola akun pengguna yang dapat menggunakan layanan sistem informasi pengajuan anggaran
              </div>
            </Card>
          </Link>
          <Link href="/super-admin/kode-akun" className="h-fit">
            <Card className="p-6 space-y-2">
              <div className="p-4 rounded-full bg-primary/5 w-fit h-fit">
                <Note className="w-[60px] h-[60px] text-primary" />
              </div>
              <h5 className="text-textstrong">Kode Akun</h5>
              <div className="text-textweak">
                Kelola kode akun yang digunakan untuk penyampaian usulan belanja modal sesuai bagan akun standar
              </div>
            </Card>
          </Link>
          <Link href="/super-admin/mata-uang" className="h-fit">
            <Card className="p-6 space-y-2">
              <div className="p-4 rounded-full bg-primary/5 w-fit h-fit">
                <Money className="w-[60px] h-[60px] text-primary" />
              </div>
              <h5 className="text-textstrong">Mata Uang</h5>
              <div className="text-textweak">
                Kelola mata uang yang digunakan untuk rencana anggaran biaya pada penyampaian usulan belanja modal
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
