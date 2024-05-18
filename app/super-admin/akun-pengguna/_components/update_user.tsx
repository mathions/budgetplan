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
  username: z.string({
    required_error: "Username belum terisi.",
  }),
  role: z.string({
    required_error: "Role belum terisi.",
  }),
  name: z.string({
    required_error: "Nama belum terisi.",
  }),
  office: z.string({
    required_error: "Kantor belum terisi.",
  }),
  office_code: z.string({
    required_error: "Kode kantor belum terisi.",
  }),
  area: z.string({
    required_error: "Area belum terisi.",
  }),
});

export function UpdateUser({ username1, role1, name1, office1, office_code1, area1, uuid }: 
  { username1: string, role1:string, name1:string, office1:string, office_code1:string, area1:string, uuid:string }) {
  const { data: session }: { data: any } = useSession();
  const token = session?.user?.token;
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: username1,
      role: role1,
      name: name1,
      office: office1,
      office_code: office_code1,
      area: area1,
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
          <h4>Ubah Akun Pengguna</h4>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="Peran">
                  <FormLabel>Peran</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="office"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Perwakilan</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="office_code"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Kode Perwakilan</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Wilayah</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                Simpan Perubahan
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
