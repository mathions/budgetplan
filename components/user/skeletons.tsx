import { Skeleton } from "../ui/skeleton"

export function BelmodCardSkeleton () {
  return (
    <Skeleton className="h-[462px] flex rounded-xl" />
  )
}

export function TableAbtSkeleton () {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row space-x-2">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-[86px]" />
        <Skeleton className="h-10 w-[136px]" />
      </div>
      <Skeleton className="h-[240px] flex rounded-md" />
    </div>
  )
}