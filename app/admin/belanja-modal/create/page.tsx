"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import Link from 'next/link'
import { useRouter } from "next/router";
import { useState } from "react";

export default function CreateBelanjaModal() {
  const { data: session }: { data: any } = useSession();
  // const { push } = useRouter();
  console.log(session?.user?.token);
  const [error, setError] = useState("");
  const token = session?.user?.token;
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch('http://localhost/skripsi/public/api/umum/year', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
          year: e.target.year.value,
      }),
    });
    console.log(res);
    if (res.status === 200) {
      // push('/admin/belanja-modal');
      console.log(res.status)
    } else {
      setError("Tahun sudah ada");
    }
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input id="year" type="number" />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}