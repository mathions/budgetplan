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
import { redirect } from "next/navigation"

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
      title: "Pengajuan ABT Berhasil Dikirim",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              <div className="items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground flex justify-start h-14 ">
                  <div className="w-full">
                    <input type="file" {...field}  className="block w-full text-sm text-gray-500
                      file:me-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary file:text-white
                      hover:file:bg-primary/90
                      hover:file:cursor-pointer
                      file:disabled:opacity-50 file:disabled:pointer-events-none
                      dark:file:bg-blue-500
                      dark:hover:file:bg-blue-400 hover:cursor-pointer p-3" />
                  </div>
                </div>
                {/* <Input type="file" {...field} className=""/> */}
              </FormControl>
              {/* <FormDescription>
                Format yang diterima adalah pdf
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid">
          <Button type="submit" className="justify-self-end">Submit</Button>
        </div>
      </form>
    </Form>
  )
}