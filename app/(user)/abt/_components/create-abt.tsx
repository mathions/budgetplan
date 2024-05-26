"use client";

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { postAbt } from "@/lib/service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Add } from "iconsax-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


const FormSchema = z.object({
  file: typeof window === 'undefined' ? z.any() : z.instanceof(File, {message: "Belum ada dokumen brafaks terpilih."}),
  perihal: z.string({
    required_error: "Perihal belum terisi.",
  }),
});

export function CreateABT() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session }: { data: any } = useSession();
  const token = session?.user?.token;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    const formdata = new FormData()
    formdata.set('file', data.file)
    formdata.set('perihal', data.perihal)
    try {
      const res = await postAbt(token, formdata);
      console.log(res);
      if (res.ok) {
        setIsLoading(false);
        setOpen(false);
        router.refresh();
        toast({
          title: "Pengajuan ABT berhasil dibuat",
        });
        form.reset();
      } else {
        setIsLoading(false);
        setOpen(false);
        toast({
          title: "Gagal membuat pengajuan ABT",
          description: res?.message,
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
        <Button variant="default">
          <Add className="mr-2 h-5 w-5" />
          Buat Pengajuan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <h4>Buat Pengajuan ABT</h4>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-2">
            <div className="space-y-4">
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
            </div>
            <div className="flex justify-start gap-4">
              <Button disabled={isLoading} type="submit">
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Buat Pengajuan
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
