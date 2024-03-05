import { Skeleton } from "./ui/skeleton";

export function TableBelmodSkeleton () {
  return (
    <div className="flex flex-col space-y-3">
      <div className="space-x-2">
        <Skeleton className="h-10 w-[60px]" />
        <Skeleton className="h-10 w-[100px]" />
      </div>
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
    </div>
  )
}