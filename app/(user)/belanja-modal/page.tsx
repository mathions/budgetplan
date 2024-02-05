'use client'

import { BelmodCard } from "@/components/belmod-card";
import { signIn } from "next-auth/react";
import router from "next/router";

export default function BelanjaModal () {
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight">Belanja Modal</h2>
      <div className="my-6">
        <BelmodCard />
      </div>
    </>
  )
}