"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { CardContent, CardFooter } from "@/components/ui/card";

export default function UbahPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="username">Password Baru</Label>
          <Input id="password-baru" type="pasword" disabled={isLoading} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="username">Konfirmasi Password</Label>
          <Input id="password-baru" type="password" disabled={isLoading} />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Ubah Password
        </Button>
      </CardFooter>
    </div>
  );
}
