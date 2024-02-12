"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function FormAbt() {
  const [perihal, setPerihal] = useState('');
  const [file, setFile] = useState<File>()

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const handleClick = async () => {
    setIsLoading(true);
    setError('');

    if (!file) return

    try {
      const res = await postItems(token, slug, newData)
      console.log(res1)

      const data = new FormData()
      data.set('file', file)
      const res2 = await postBrafaks(token,slug, data)
      console.log(res2)

      console.log('Both requests succeeded');
    } catch (error) {
      setError('File is invalid');
    } finally {
      setIsLoading(false);
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
            {error && <p>Error: {error}</p>}
      </div>
    </>
  )
}