import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UbahPasswordForm from "./ubah-password-form";

export default function Page() {
  return (
    <Card className="w-full max-w-sm h-fit">
      <CardHeader>
        <CardTitle>Ubah Password</CardTitle>
        <CardDescription>Password baru anda harus berbeda dengan password sebelumnya</CardDescription>
      </CardHeader>
      <UbahPasswordForm/>
    </Card>
  );
}
