import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import UbahPasswordForm from "./ubah-password-form";
import Image from "next/image";
import logo from "@/public/logo.svg";

export default function Page() {
  return (
    <div className="w-full max-w-sm space-y-6 px-4 md:px-0">
      <div className="flex justify-center">
        <Image src={logo} width={218} height={32} alt="logo"></Image>
      </div>
      <Card className="w-full max-w-sm h-fit">
        <CardHeader>
          <CardTitle className="text-center">Ubah Password</CardTitle>
          <CardDescription className="text-center">Password baru anda harus berbeda dengan password sebelumnya</CardDescription>
        </CardHeader>
        <CardContent>
          <UbahPasswordForm/>
        </CardContent>
      </Card>
    </div>
  );
}
