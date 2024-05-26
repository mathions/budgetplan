"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { useSession } from "next-auth/react";
import { Sms, User } from "iconsax-react";

const FormSchema = z.object({
  username: z.string({
    required_error: "Username belum terisi",
  }),
  email: z.string({
    required_error: "Email belum terisi",
  }).email({
    message: "Email tidak valid",
  }),
});

export default function LupaPasswordForm() {
  const { data: session }: { data: any } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const router = useRouter();
  if (session) {
    router.push("/beranda");
  }
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    router.push('/auth/ubah-password');
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="h-4 w-4 absolute left-4 top-[14px]"/>
                    <Input {...field} disabled={isLoading} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Sms className="h-4 w-4 absolute left-4 top-[14px]"/>
                    <Input {...field} disabled={isLoading} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Selanjutnya
          </Button>
          <Button variant="link" asChild className="w-full"><Link href="/auth/login">Kembali</Link></Button>
        </form>
      </Form>
    </div>
  );
}
