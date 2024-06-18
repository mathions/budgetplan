import { Suspense } from "react";
import { Notification } from "iconsax-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator, } from "@/components/ui/dropdown-menu";
import { Content } from "../notifikasi/content";
import { NotifSkeleteon } from "../notifikasi/skeleton";
import Link from "next/link";

export function Notif() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-background text-textweak hover:bg-strokeweak hover:text-textstrong px-2 w-10">
          <Notification className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[360px]" align="end">
        <DropdownMenuLabel className="font-semibold text-textstrong text-2xl">
          Notifikasi
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Suspense fallback={<NotifSkeleteon />}>
          <Content />
        </Suspense>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5">
          <Button className="w-full" asChild>
            <Link href="/super-admin/notifikasi">Lihat Selengkapnya</Link>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
