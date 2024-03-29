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
  tahun: z.string(),
  wilayah: z.string(),
  komponen: z.string(),
})

type RekapFormValues = z.infer<typeof rekapFormSchema>

// This can come from your database or API.
const defaultValues: Partial<RekapFormValues> = {
  // perihal: "Kendaraan Dinas",

}

export function FormRekap() {


  const handleClick = () => {
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
          name="tahun"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tahun Anggaran</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Pilih tahun anggaran" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="wilayah"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wilayah</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Pilih wilayah" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="semua">Semua Wilayah</SelectItem>
                  <SelectItem value="eropa">Eropa</SelectItem>
                  <SelectItem value="amerika">Amerika</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                  <SelectItem value="afrika">Afrika</SelectItem>
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
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Pilih komponen" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="semua">Semua Komponen</SelectItem>
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
        <div className="space-x-3 flex justify-end">
          <Button type="submit" variant="outline" className="w-[96px]">Hasilkan</Button>
          <Button className="w-[96px]">Ekspor</Button>
        </div>
      </form>
    </Form>
  )
}