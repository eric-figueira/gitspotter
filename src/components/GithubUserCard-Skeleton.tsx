import { Skeleton } from '@/components/ui'

export default function GithubUserCardSkeleton() {
  return (
    <div className='flex flex-col md:flex-row gap-5 p-5 animate-pulse border-[2px] rounded-lg w-full border-neutral-600 dark:border-neutral-300'>
      <div className='w-fit'>
        <Skeleton className='h-16 w-16 rounded-full bg-neutral-700 dark:bg-neutral-400' />
      </div>
      <div className='w-full'>
        <Skeleton className='h-6 w-full mb-5 bg-neutral-700 dark:bg-neutral-400' />
        <Skeleton className='h-9 max-sm:w-28 lg:w-28 bg-neutral-700 dark:bg-neutral-400' />
      </div>
    </div>
  )
}