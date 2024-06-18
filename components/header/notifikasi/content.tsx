import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getNotifikasi } from "@/services/auth";
import { DropdownMenuItem, DropdownMenuSeparator, } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Notification } from "@/lib/definitions";

export async function Content() {
  const session: any = await getServerSession(authOptions);
  const token = session?.user?.token;
  const notifications: Notification[] = await getNotifikasi(token);

  return(
    <ScrollArea className="h-[280px] w-full">
      {notifications.map((notification, index) => (
        <div key={index}>
          <DropdownMenuItem>
            <div>
              <div className="font-semibold text-textstrong">{notification?.title}</div>
              <div className="text-textweak">{notification?.message}</div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </div>
      ))}
    </ScrollArea>
  )
}