"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { postAbt } from "@/lib/service";
import { useState } from "react";

export default function FormAbt({ token } : { token: string }) {
  const [perihal, setPerihal] = useState('');
  const [file, setFile] = useState<File>()

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = async () => {
    setIsLoading(true);
    setError('');

    if (!file) return

    try {
      const data = new FormData()
      data.set('file', file)
      data.set('perihal', perihal)
      const res = await postAbt(token, data)
      console.log(res)
      // console.log(perihal);
      console.log('Success');
      // setIsLoading(false);
    } catch (error) {
      setError('File is invalid');
    } finally {
      setIsLoading(false);
      setError('Abt berhasil diajukan')
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="space-y-3">
          <p className="text-sm font-medium leading-none">
            Perihal
          </p>
          <Input type="text" name="perihal" onChange={(e) => setPerihal(e.target.value)} />
        </div>
        <div className="space-y-3">
          <p className="text-sm font-medium leading-none">
            Brafaks
          </p>
          <Input type="file" name="file" onChange={(e) => setFile(e.target.files?.[0])} />
        </div>
        <Button onClick={handleClick} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Simpan'}
            </Button>
            {error && <p>{error}</p>}
      </div>
    </>
  )
}