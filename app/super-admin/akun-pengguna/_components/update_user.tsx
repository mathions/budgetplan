"use client";

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit } from "iconsax-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogClose, } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast";
import { updateUser } from "@/lib/service-super-admin";
import { useState } from "react";
import { Icons } from "@/components/icons";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    required_error: "Perwakilan belum terisi.",
  }),
  office_code: z.string({
    required_error: "Kode satker belum terisi.",
  }),
  area: z.string({
    required_error: "Wilayah belum terisi.",
  }),
  country: z.string({
    required_error: "Negara belum terisi.",
  }),
});

export function UpdateUser({ username1, role1, name1, office1, office_code1, country1, area1, uuid }: 
  { username1: string, role1:string, name1:string, office1:string, office_code1:string, country1:string, area1:string, uuid:string }) {
  const { data: session }: { data: any } = useSession();
  const token = session?.user?.token;
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: username1,
      role: role1,
      name: name1,
      office: office1,
      office_code: office_code1,
      area: area1,
      country: country1,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
      const res = await updateUser(token, uuid, data);
      console.log(res);
      if (res.ok) {
        setIsLoading(false);
        setOpen(false);
        router.refresh();
        toast({
          title: "Akun pengguna berhasil diubah",
        });
      } else {
        setIsLoading(false);
        setOpen(false);
        toast({
          title: "Gagal mengubah akun pengguna",
          description: res.message,
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
        <Button variant="link" className="p-2">
          <Edit className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] pl-4 pr-2" tabIndex={undefined}>
        <DialogHeader className="px-2">
          <h4>Ubah Akun Pengguna</h4>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh] pr-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2 px-2">
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih peran" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="User">User</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <FormLabel>Kode Satker</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Negara</FormLabel>
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
            <div className="flex justify-start gap-4 pt-2">
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
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
