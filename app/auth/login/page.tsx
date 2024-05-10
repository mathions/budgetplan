import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import LoginForm from "./login-form"

export default function Login() {
  return (
    <Card className="w-full max-w-sm h-fit">
      <CardHeader>
        <CardTitle className="text-4xl">Login</CardTitle>
        <CardDescription>
          Silahkan masuk ke akun anda
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <LoginForm/>
      </CardContent>
    </Card>
  )
}
