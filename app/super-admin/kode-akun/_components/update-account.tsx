"use client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Add, Edit } from "iconsax-react";
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
  account_number: z.string({
    required_error: "Kode akun belum terisi.",
  }),
  account_name: z.string({
      required_error: "Uraian akun belum terisi.",
    }),
});

export function UpdateAccount({ number, name, uuid }: { number: string, name:string, uuid:string }) {
  const { data: session }: { data: any } = useSession();
  const token = session?.user?.token;
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      account_number: number,
      account_name: name,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // setIsLoading(true);
    // try {
    //   const res = await updateCurrency(token, data);
    //   console.log(res);
    //   if (res.status === 201) {
    //     setIsLoading(false);
    //     setOpen(false);
    //     window.location.reload();
    //     toast({
    //       title: "Mata uang berhasil ditambahkan",
    //     });
    //   } else {
    //     setIsLoading(false);
    //     setOpen(false);
    //     toast({
    //       title: "Gagal menambahkan mata uang",
    //       variant: "destructive",
    //     });
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="p-2">
          <Edit className="h-6 w-6" />
          
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] space-y-4">
        <DialogHeader>
          <h4>Ubah Mata Uang</h4>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="account_number"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Kode Akun</FormLabel>
                  <FormControl>
                    <Input {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="account_name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Uraian AKun</FormLabel>
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
                Ubah
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
