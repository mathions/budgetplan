"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { postFiles } from "@/services/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExportCurve } from "iconsax-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogClose, DialogTrigger, } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";

const FormSchema = z.object({
  file: z.instanceof(File, { message: "Belum ada berkas terpilih." }),
});

export function UploadFile({ uuid, token }: { uuid: string; token: string }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    const formdata = new FormData();
    formdata.set("file", data.file);
    try {
      const res = await postFiles(token, uuid, formdata);
      if (res.ok) {
        setIsLoading(false);
        setOpen(false);
        router.refresh();
        form.reset();
        toast({
          title: "Berkas berhasil diunggah",
        });
      } else {
        setIsLoading(false);
        setOpen(false);
        toast({
          title: "Gagal mengunggah berkas",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <ExportCurve className="mr-2 h-5 w-5" />
          Unggah Berkas
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <h4>Unggah Berkas</h4>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-2"
          >
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
                  <FormDescription>
                    Format yang diterima .pdf, .xlsx, .xls, .dan .zip.
                  </FormDescription>
                  <FormDescription>Ukuran maksimal 10 mb.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-start gap-4 pt-2">
              <Button disabled={isLoading} type="submit">
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Unggah Berkas
              </Button>
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
