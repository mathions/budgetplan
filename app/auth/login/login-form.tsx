"use client";
import { useState } from "react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { PasswordInput } from "@/components/password-input";
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
import { useSession } from "next-auth/react";

const FormSchema = z.object({
  username: z.string().min(1, {
    message: "Username belum terisi",
  }),
  password: z.string().min(1, {
    message: "Password belum terisi",
  }),
});

export default function LoginForm() {
  const { data: session }: { data: any } = useSession();


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const router = useRouter();
  
  if (session) {
    router.push("/admin");
  }

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setError("");
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: data.username,
        password: data.password,
      });
      console.log(res);
      if (!res?.error) {
        setIsLoading(false);
        router.refresh();
        router.push('/beranda');
      } else {
        setIsLoading(false);
        if (res.status === 401) {
          setError("Username atau Password salah");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid gap-6">
      {error !== "" && (
        <div className="text-destructive text-center text-sm font-semibold">
          {error}
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
                <div className="flex w-full justify-start">
                  <Button variant="link" asChild className="p-0 h-fit">
                    <Link href="/auth/lupa-password">Lupa password?</Link>
                  </Button>
                </div>
              </FormItem>
            )}
          />
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}
