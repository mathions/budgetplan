import React from 'react'
import { AbtForm } from "./abt-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Create () {
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight">ABT / Buat</h2>
      <div className="my-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>KBRI Islamabad</CardTitle>
          {/* <CardDescription>Tahun Anggaran 2025</CardDescription> */}
        </CardHeader>
        <CardContent className="grid gap-4">
          <AbtForm />
        </CardContent>
      </Card>  
      </div>
    </>
  )
}
