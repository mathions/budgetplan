import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./login-form";

export default function LoginPage() {
  
  return (
    <Card className="w-full max-w-sm h-fit">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Silahkan masuk ke akun anda</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <LoginForm />
      </CardContent>
    </Card>
  );
}
