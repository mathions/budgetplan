"use client"
import { useState, useEffect } from "react"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { redirect } from "next/navigation"

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: AuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const submitData = {username,password}
    console.log(submitData)
    try {
      const res = await fetch('http://192.168.8.165/Backend/public/api/login',{
        method: 'POST',
        body: JSON.stringify(submitData),
        headers: {
          'content-type': 'application/json'
        }
      })
      console.log(res)
      if(res.ok){
        return redirect('/dashboard')
      }else{
        console.log("Oops! Something is wrong.")
      }
    } catch (error) {
        console.log(error)
    }
    setUsername('')
    setPassword('')
  }

  

  // async function onSubmit(event: React.SyntheticEvent) {
  //   event.preventDefault()
  //   setIsLoading(true)

  //   setTimeout(() => {
  //     setIsLoading(false)
  //   }, 3000)
  // }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username"  type="username" autoCapitalize="none" autoComplete="email" autoCorrect="off" disabled={isLoading} onChange={e => setUsername(e.target.value)}/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" value={password} type="password" disabled={isLoading} onChange={e => setPassword(e.target.value)}/>
          </div>
          <div className="grid mt-2">
            <Button disabled={isLoading} type="submit">
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
              Lanjutkan
            </Button>
          </div>
        </div>
      </form>

    </div>
  )
}