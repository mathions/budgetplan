"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { CardContent, CardFooter } from "@/components/ui/card";

export default function LupaPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      <CardContent className="grid gap-4">
      <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" type="text" disabled={isLoading} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="username">Email</Label>
          <Input id="email" type="email" disabled={isLoading} />
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
    </div>
  );
}
