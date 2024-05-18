"use client";

import { postFiles } from "@/lib/service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Add, ExportCurve } from "iconsax-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  file: z.instanceof(File, { message: "Belum ada berkas terpilih." }),
});

export function UploadFile({ uuid, token }: { uuid: string; token: string }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formdata = new FormData();
    formdata.set("file", data.file);
    const res = await postFiles(token, uuid, formdata);
    console.log(res);
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <ExportCurve className="mr-2 h-5 w-5" />
          Unggah Berkas
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] space-y-4">
        <DialogHeader>
          <h4>Unggah Berkas</h4>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Dokumen Brafaks</FormLabel>
                  <Input
                    accept=".pdf, .xlsx, .xls, .zip"
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
              {/* <DialogClose asChild>
              </DialogClose> */}
                <Button type="submit">Unggah Berkas</Button>
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