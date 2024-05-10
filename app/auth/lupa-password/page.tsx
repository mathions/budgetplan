"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import Link from "next/link";

export default function LupaPasswordn() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Card className="w-full max-w-sm h-fit">
      <CardHeader>
        <CardTitle className="text-4xl">Lupa Password</CardTitle>
        <CardDescription>Silahkan masuk ke akun anda</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="username">Email</Label>
          <Input id="email" type="text" disabled={isLoading} />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Selanjutnya
        </Button>
        <Button asChild variant="link" className="w-full">
          <Link href="/auth/login">Kembali</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
