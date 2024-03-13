"use client"

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createBelMod } from "@/lib/service-admin";
import { useState } from "react";

export default function FormBelanjaModal({ token } : { token: string }) {
  const [year, setYear] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = async () => {
    setIsLoading(true);
    setError('');

    try {
      const res = await createBelMod(token, year)
      setError('Usulan kebutuhan belanja modal untuk tahun anggaran berhasil dibuat')
    } catch (error) {
      setError('Maaf, ada permasalahan teknis');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="space-y-3">
          <p className="text-sm font-medium leading-none">
            Tahun Anggaran
          </p>
          <Input type="text" name="year" required onChange={(e) => setYear(e.target.value)} />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleClick} disabled={isLoading} className="w-[96px]">
            {isLoading && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)}
            Mulai
          </Button>
        </div>
        <div className=" flex justify-end">
          {error && <p>{error}</p>}
        </div>
      </div>
    </>
  )
}