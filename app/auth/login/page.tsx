import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./login-form";
import Image from "next/image";
import logo from "@/public/logo.svg";

export default function LoginPage() {
  
  return (
    <div className="w-full max-w-sm space-y-6 px-4 md:px-0">
      <div className="flex justify-center">
        <Image src={logo} width={218} height={32} alt="logo"></Image>
      </div>
      <Card className="h-fit shadow-sm">
        <CardHeader>
          <CardTitle className="font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">Silahkan masuk ke akun anda</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
