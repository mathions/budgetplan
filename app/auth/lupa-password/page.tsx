import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import LupaPasswordForm from "./lupa-password-form";
import Image from "next/image";
import logo from "@/public/logo.svg";

export default function Page() {
  return (
    <div className="w-full max-w-sm space-y-6 px-4 md:px-0">
      <div className="flex justify-center">
        <Image src={logo} width={218} height={32} alt="logo"></Image>
      </div>
      <Card className="h-fit shadow-sm">
        <CardHeader>
          <CardTitle className="text-center">Lupa Password</CardTitle>
          <CardDescription className="text-center">
            Masukkan username dan email akun anda
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <LupaPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
