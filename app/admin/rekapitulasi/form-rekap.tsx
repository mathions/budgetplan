"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

const rekapFormSchema = z.object({
  wilayah: z.string(),
  satuan_kerja: z.string(),
  komponen: z.string(),
})

type RekapFormValues = z.infer<typeof rekapFormSchema>

// This can come from your database or API.
const defaultValues: Partial<RekapFormValues> = {
  // perihal: "Kendaraan Dinas",

}

export function FormRekap() {

  const [showTable, setShowTable] = useState(false);

  const handleClick = () => {
    setShowTable(!showTable);
  };
  
  const form = useForm<RekapFormValues>({
    resolver: zodResolver(rekapFormSchema),
    defaultValues,
    mode: "onChange",
  })


  function onSubmit(data: RekapFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
    handleClick()
  }

  
  return (
    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="wilayah"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wilayah</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih wilayah" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="asia">Asia</SelectItem>
                  <SelectItem value="eropa">Eropa</SelectItem>
                  <SelectItem value="america">Amerika</SelectItem>
                  <SelectItem value="afrika">Afrika</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="satuan_kerja"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Satuan Kerja</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih satuan kerja" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="kbri paris">KBRI Paris</SelectItem>
                  <SelectItem value="kbri berlin">KBRI Berlin</SelectItem>
                  <SelectItem value="kbri stockholm">KBRI Stockholm</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="komponen"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Komponen</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih komponen" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="055">[055] Kendaraan Bermotor Perwakilan RI</SelectItem>
                  <SelectItem value="056">[056] Perangkat Pengolah Data dan Komunikasi Perwakilan</SelectItem>
                  <SelectItem value="057">[057] Perangkat Fasilitas Perkantoran Perwakilan</SelectItem>
                  <SelectItem value="058">[058] Pembangunan/Renovasi Gedung dan Bangunan Perwakilan RI</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
    
        <Button type="submit" >Generate Data</Button>
      </form>
      {showTable && <div className="space-y-4 mt-4"><div>Ini Tabel</div> <div> <Button>Export to Excel</Button></div></div>}
    </Form>
  )
}