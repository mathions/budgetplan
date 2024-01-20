import { FileTextIcon, } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { RabTable } from "./rab-table"
import { Payment, columns } from "./rab-column"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

type CardProps = React.ComponentProps<typeof Card>

export function UsulanCard({ className, ...props }: CardProps) {
  
  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>KBRI Islamabad</CardTitle>
        <CardDescription>Tahun Anggaran 2025</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">

        <div className="grid items-start pb-2 last:mb-0 last:pb-0">
          <div className="space-y-2">
            <p className="text-sm font-medium leading-none">
              Brafaks
            </p>
            <Button asChild variant="outline" className="flex justify-start h-12">
              <Link href="/belanja-modal/usulan">
                <FileTextIcon className="mr-4 h-4 w-4" />Unggah brafaks
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid items-start pb-2 last:mb-0 last:pb-0">
          <div className="space-y-2">
            <p className="text-sm font-medium leading-none">
              Rencana Anggaran Biaya
            </p>
            <div className="container mx-auto py-10">
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}
