import { getNotifikasi } from "@/services/auth";
import { Notification } from "@/lib/definitions";

export async function SuspensePage ({ token } : { token:string }) {
  const notifications: Notification[] = await getNotifikasi(token)

  return (
    <div className="space-y-2">
      {notifications.map((notification, index) => (
        <div key={index} className="border p-4 bg-white rounded-lg">
          <div className="font-semibold text-textstrong">{notification?.title}</div>
          <div className="text-textweak">{notification?.message}</div>
        </div>
      ))}
    </div>
  )
}