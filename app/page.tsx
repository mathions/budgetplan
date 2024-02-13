import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import { NextResponse } from "next/server";

export default async function Home() {
  const session = await getServerSession(authOptions)
  if(!session) {
    return NextResponse.redirect('/login')
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    </main>
  );
}
