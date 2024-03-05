import { Metadata } from "next"
import LoginForm from "./login-form"
import Image from 'next/image'
import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import { NextResponse } from "next/server";
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: "Login | budgetplan",
  description: "budgetplan",
  icons: {
    icon: "/logo.svg",
  },
}

export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  if(session) {
    redirect('/beranda')
  }

  return (
    <>
      <div className="h-screen w-screen bg-muted grid place-content-center">
        <div className="h-[500px] w-[360px] md:w-[750px] bg-white flex flex-row rounded-[24px]">
          <div className="basis-[360px] p-9 ">
            <div className="h-full flex flex-col justify-around">
              <div>
                <Image src="/logo_kemlu.webp" alt="logo" width={150} height={47}/>
              </div>
              <h1 className="text-3xl font-bold text-center">budgetplan</h1>
              <LoginForm />
            </div>
          </div>
          <div className="hidden md:flex basis-[390px] p-2">
            <div className="bg-black h-full flex items-end rounded-[24px] ">
              <Image src="/decorative.png" alt="decorative" 	width={384} height={377} className="rounded-[24px]"/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}