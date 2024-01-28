import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { LoginForm } from "./login-form"

export const metadata: Metadata = {
  title: "Login | budgetplan",
  description: "budgetplan",
}

export default function LoginPage() {
  return (
    <>
      <div className="h-screen w-screen bg-muted grid place-content-center">
        <div className="h-[500px] w-[750px] bg-white flex flex-row rounded-[24px]">
          <div className="basis-[350px] p-9 ">
            <div className="h-full flex flex-col justify-around">
              <div>
                <img src="/logo_kemlu.webp" alt="logo" width="150"/>
              </div>
              <h1 className="text-3xl font-bold text-center">budgetplan</h1>
              <LoginForm />
            </div>
          </div>
          <div className="basis-[400px] p-2">
            <div className="bg-black h-full flex items-end rounded-[24px] ">
              <img src="decorative.png" alt="decorative" className="rounded-[24px]" />
            </div>
          </div>
        </div>
      </div>






    {/* <main className="flex-1">
      <div className="relative h-screen w-screen flex-col items-center justify-center grid max-w-none px-0">
          <div className="h-full w-screen flex-col p-8 md:p-10 flex dark:border-r">
            <div className="relative z-20 flex justify-between ">
              <div className="flex items-center text-lg font-medium">
                <Image className="mr-2" src="/logo_kemenlu.png" alt="logo kemenlu" width={52} height={52}/>
                <div className="hidden md:block">Biro Umum
                  <div className="text-base text-foreground/50">
                    Kementerian Luar Negeri RI
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <p className="font-bold text-lg">budgetplan</p>
                
              </div>
            </div>
            <div className="h-full flex justify-center">
              <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-3 text-center">
                  <h1 className="text-3xl font-semibold tracking-tight">
                    Login
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Masukkan username dan password anda
                  </p>
                </div>
                <LoginForm />
              </div>
            </div>
          </div>
        <div className="relative h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-foreground/75" />
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg text-end">
                &ldquo;Memimpin diplomasi yang aktif dan efektif untuk mewujudkan <br/>
                Indonesia Maju yang Berdaulat, Mandiri, dan berkepribadian <br/>
                berlandaskan Gotong Royong.&rdquo;
              </p>
              <footer className="text-sm text-end">Visi Kementerian Luar Negeri</footer>
            </blockquote>
          </div>
        </div>

      </div>
      </main> */}
    </>
  )
}