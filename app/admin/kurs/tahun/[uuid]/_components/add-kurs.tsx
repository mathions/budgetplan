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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FormSchema = z.object({
  initial: z.string({
    required_error: "Mata uang perlu dipilih",
  }),
  value: z.string({
    required_error: "Nilai tukar perlu diisi",
  }),
});

export function AddKurs({ token, currency }: { token: string; currency: any }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  console.log(currency);
  const year = new Date().getFullYear().toString();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formdata = new FormData();
    formdata.set("file", data.initial);
    formdata.set("perihal", data.value);
    formdata.set("year", year);
    const res = await postAbt(token, formdata);
    console.log(res);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <Add className="mr-2 h-5 w-5" />
          Tambah Kurs
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] space-y-4">
        <DialogHeader>
          <h4>Tambah Kurs</h4>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="initial"
                render={({ field }) => (
                  <FormItem className="col-span-1 flex flex-col">
                    <FormLabel>Mata Uang</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} >
                      <FormControl>
                        <SelectTrigger className="h-10 text-base">
                          <SelectValue placeholder="Pilih mata uang" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Euro">Euro</SelectItem>
                        <SelectItem value="Poundsterling">Poundsterling</SelectItem>
                        <SelectItem value="Yen">Yen</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem className="col-span-1 flex flex-col">
                    <FormLabel>Nilai Tukar</FormLabel>
                    <Input {...field} />
                    <FormControl></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-start gap-4">
              <Button type="submit">Tambah Kurs</Button>
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
