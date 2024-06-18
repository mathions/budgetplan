import { Skeleton } from "@/components/ui/skeleton";

export function ProfilSkeleton () {
  return (
    <div className="flex flex-col space-y-4">
      <Skeleton className="h-[360px] flex rounded-md" />
    </div>
  )
}