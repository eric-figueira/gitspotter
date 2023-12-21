import { Skeleton } from "./ui/skeleton";

export default function GithubUserCardSkeleton() {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-5 p-5 animate-pulse border-[2px] rounded-lg w-full">
        <div className="w-fit">
          <Skeleton className="h-16 w-16 rounded-full" />
        </div>
        <div className="w-full">
          <Skeleton className="h-6 w-full mb-5" />
          <Skeleton className="h-9 max-sm:w-28 lg:w-28" />
        </div>
      </div>
    </>
  )
}