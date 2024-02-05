"use client"
import { useState, useEffect } from "react"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

export default function LoginForm() {

  const { push } = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const onSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await signIn('credentials', {
        redirect: false,
        username: e.target.username.value,
        password: e.target.password.value,
        callbackUrl: '/beranda',
      });
      console.log(res);
      if (!res?.error) {
        e.target.reset();
        setIsLoading(false);
        push('/beranda');
      } else {
        setIsLoading(false);
        if (res.status === 401){
          setError("Username atau Password salah");
        }
      }
    } catch (err) {
      console.log(err);
    }
  } ;

  return (
    <div className="grid gap-6">
      {error !== '' && (
        <div className="text-destructive text-center text-sm font-semibold">{error}</div>
      )}
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="username" disabled={isLoading} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" disabled={isLoading} />
          </div>
          <div className="grid">
            <Button disabled={isLoading} type="submit">
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
              Login
            </Button>
          </div>
        </div>
      </form>

    </div>
  )
}