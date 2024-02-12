"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Usulan({ params }: {params: { slug: string } }) {
  const [file, setFile] = useState<File>()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    try {
      const data = new FormData()
      data.set('file', file)

      const res = await fetch(`http://localhost/skripsi/public/api/proposal/kbri-berlin-2025/brafaks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer 4|FWQkZy5Afb3LOfhbEwwvhHrB6e6jvmHxvvBk4JeJ69414ecc`
        },
        body: data
        })
      const jsonResponse = await res.json();
      console.log(jsonResponse)
      // handle the error
      if (!res.ok) throw new Error(await res.text())
    } catch (e: any) {
      // Handle errors here
      console.error(e)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="file"
        name="file"
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <Button type="submit">Upload</Button>
      {/* <input type="submit" value="Upload" /> */}
    </form>
  );
  
}
