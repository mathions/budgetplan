import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleteon () {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row space-x-2">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-[120px]" />
      </div>
      <Skeleton className="h-[360px] flex rounded-md" />
    </div>
  )
}