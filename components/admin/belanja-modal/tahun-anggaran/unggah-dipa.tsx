"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { postDipa } from "@/lib/service-admin";
import { useState } from "react";

export default function UnggahDipa({ token, uuid } : { token: string, uuid:string }) {
  const [file, setFile] = useState<File>()

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = async () => {
    setIsLoading(true);
    setError('');

    if (!file) {
      setError('Pilih dokumen DIPA terlebih dahulu')
      setIsLoading(false);
      return
    }

    try {
      const data = new FormData()
      data.set('file', file)
      const res = await postDipa(token, uuid, data)
      console.log(res.success)
      if (res.success == false) {
        setError('File harus bertipe pdf')
      }
      window.location.reload();
    } catch (error) {
      setError('File is invalid');
    } finally {
      setIsLoading(false);
      setError('DIPA berhasil diunggah')
    }
  };

  return (
    <>
      <div className="space-y-2">
        <Input type="file" name="file" onChange={(e) => setFile(e.target.files?.[0])} />
      </div>
      <div className="flex justify-end">
        <Button onClick={handleClick} disabled={isLoading} className="w-[96px]">
          {isLoading ? 'Loading...' : 'Unggah'}
        </Button>
      </div>
      <div className="flex justify-end">
        {error && <p>{error}</p>}
      </div>
    </>
  )
}