"use client";

import { postAbt } from "@/lib/service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Add } from "iconsax-react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  file: z.instanceof(File, {message: "Belum ada dokumen brafaks terpilih."}),
  perihal: z.string({
    required_error: "Perihal belum terisi.",
  }),
});

export function AddKurs({ token, currency } : { token:string, currency: any }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  console.log(currency)
  const year = new Date().getFullYear().toString();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formdata = new FormData()
    formdata.set('file', data.file)
    formdata.set('perihal', data.perihal)
    formdata.set('year', year)
    const res = await postAbt(token, formdata)
    console.log(res)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <Add className="mr-2 h-5 w-5" />
          Tambah Kurs
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <h4>Tambah Kurs</h4>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="perihal"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Perihal</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Dokumen Brafaks</FormLabel>
                  <Input
                    accept=".pdf"
                    type="file"
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                  />
                  <FormControl></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-start gap-4">
              <Button type="submit">Buat Pengajuan</Button>
              <DialogClose asChild>
                <Button variant="secondary">Batal</Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
