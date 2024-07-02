import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "@/components/header/logo"

export default function Page() {
  return (
    <div className="w-full max-w-sm space-y-6 px-4 md:px-0">
      <div className="flex justify-center">
        <Logo />
      </div>
      <Card className="h-fit shadow-sm">
        <CardHeader>
          <CardTitle className="text-center">Lupa Password</CardTitle>
          <CardDescription className="text-center text-lg mt-2">
            Silahkan menghubungi Biro Umum
          </CardDescription>
          <Button variant="link" asChild className="w-full"><Link href="/auth/login">Kembali</Link></Button>
        </CardHeader>
      </Card>
    </div>
  );
}
