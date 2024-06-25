"use client";

import { Card } from "@/components/ui/card";
import { DeleteUser } from "./delete-user";

export function Hapus({ uuid }: { uuid:string }) {
  return (
    <Card className="p-8 space-y-4">
      <div className="space-y-2">
        <h4>Hapus Akun</h4>
        <p className="text-textweak">Seluruh data terkait akun pengguna akan hilang. </p>
      </div>
      <DeleteUser uuid={uuid}/>
    </Card>
  );
}
