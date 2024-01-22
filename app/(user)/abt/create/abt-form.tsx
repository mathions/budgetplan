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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const abtFormSchema = z.object({
  perihal: z.string().max(160).min(4, {message: "Perihal masih kosong"}),
  dokumen: z.string()
})

type AbtFormValues = z.infer<typeof abtFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AbtFormValues> = {
  // perihal: "Kendaraan Dinas",

}

export function AbtForm() {
  const form = useForm<AbtFormValues>({
    resolver: zodResolver(abtFormSchema),
    defaultValues,
    mode: "onChange",
  })


  function onSubmit(data: AbtFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="perihal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Perihal</FormLabel>
              <FormControl>
                <Textarea
                  placeholder=""
                  className="resize-none"
                  spellCheck="false"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>
                Anda dapat menyebutkan ABT yang diajukan digunakan untuk apa 
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dokumen"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Berita Faksimile (Brafaks)</FormLabel>
              <FormControl>
                <Input type="file" {...field} className=""/>
              </FormControl>
              {/* <FormDescription>
                Format yang diterima adalah pdf
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Kirim</Button>
      </form>
    </Form>
  )
}