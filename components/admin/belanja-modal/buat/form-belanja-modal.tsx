"use client"

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
      const jsonResponse = await res.json();
      console.log(jsonResponse)
      if (res.status === 200) {
          return setError('Usulan Belanja Modal berhasil dibuat')
      } else {
          return setError('Tahun Anggaran sudah ada')
      }
    } catch (error) {
      setError('Maaf, ada permsalahan teknis');
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
          <Button onClick={handleClick} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Buat'}
          </Button>
        </div>
        <div className=" flex justify-end text-destructive">
          {error && <p>{error}</p>}
        </div>
      </div>
    </>
  )
}