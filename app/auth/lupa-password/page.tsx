import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LupaPasswordForm from "./lupa-password-form";

export default function Page() {
  return (
    <Card className="w-full max-w-sm h-fit">
      <CardHeader>
        <CardTitle>Lupa Password</CardTitle>
        <CardDescription>Masukkan username dan email akun anda</CardDescription>
      </CardHeader>
      <LupaPasswordForm/>
    </Card>
  );
}
