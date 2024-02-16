import { Metadata } from "next"
import LoginForm from "./login-form"
import Image from 'next/image'

export const metadata: Metadata = {
  title: "Login | budgetplan",
  description: "budgetplan",
  icons: {
    icon: "/bp.svg",
  },
}

export default function LoginPage() {
  return (
    <>
      <div className="h-screen w-screen bg-muted grid place-content-center">
        <div className="h-[500px] w-[750px] bg-white flex flex-row rounded-[24px]">
          <div className="basis-[350px] p-9 ">
            <div className="h-full flex flex-col justify-around">
              <div>
                <Image src="/logo_kemlu.webp" alt="logo" width={150} height={47}/>
              </div>
              <h1 className="text-3xl font-bold text-center">budgetplan</h1>
              <LoginForm />
            </div>
          </div>
          <div className="basis-[400px] p-2">
            <div className="bg-black h-full flex items-end rounded-[24px] ">
              <Image src="/decorative.png" alt="decorative" 	width={384} height={377} className="rounded-[24px]"/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}