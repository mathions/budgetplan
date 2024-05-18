"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AddSquare } from "iconsax-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { postCurrency } from "@/lib/service-super-admin";
import { useState } from "react";
import { Icons } from "@/components/icons";

const FormSchema = z.object({
  name: z.string({
    required_error: "Mata uang belum terisi.",
  }),
  initial: z
    .string({
      required_error: "Kode belum terisi.",
    })
    .min(3, { message: "Kode harus terdiri dari 3 karakter." })
    .max(3, { message: "Kode harus terdiri dari 3 karakter." }),
});

export function AddCurrency() {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3OGQyMzUyMi02YTQ4LTRjNGEtYjI3Yi05YmM2M2RhYTYzNDYiLCJ1c2VybmFtZSI6InVtdW0iLCJ1c2VyUm9sZSI6ImFkbWluIiwiaWF0IjoxNzE1OTkzNDQ0LCJleHAiOjE3MTYwNzk4NDR9.OFVl9xqRUWP8HwUU7w1xM-mSQ_i-74AsdLw9m9gKzwA"
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
      const res = await postCurrency(token, data);
      console.log(res);
      if (res.status === 201) {
        setIsLoading(false);
        setOpen(false);
        window.location.reload();
        toast({
          title: "Mata uang berhasil ditambahkan",
        });
      } else {
        setIsLoading(false);
        setOpen(false);
        toast({
          title: "Gagal menambahkan mata uang",
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
          <AddSquare className="mr-2 h-5 w-5" />
          Tambah Mata Uang
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] space-y-4">
        <DialogHeader>
          <h4>Tambah Mata Uang</h4>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Mata Uang</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="initial"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Kode</FormLabel>
                  <FormControl>
                    <Input {...field} autoCapitalize="on" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-start gap-4 pt-4">
              <Button disabled={isLoading} type="submit">
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Tambah
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
