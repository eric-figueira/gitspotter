'use client'

import { Alert, Pagination, PaginationContent, PaginationPrevious, PaginationLink, PaginationNext } from '@/components/ui'
import GithubUser from '@/lib/types/GithubUser'
import GithubUserCard from '@/components/GithubUserCard'
import GithubUserCardSkeleton from '@/components/GithubUserCard-Skeleton'
import { MoreHorizontal, Search, UserX } from 'lucide-react'
import { useNonFollowersResults } from '@/contexts/NonFollowersContext'

export default function Results() {

  let {
    filter,
    isError,
    error,
    isFetching,
    isFetched,
    paginatedData,
    currentPage,
  } = useNonFollowersResults()

  const {
    numberPages,
    previous,
    next,
    page,
  } = useNonFollowersResults()

  return (
    <div>
      {isFetching ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
          {Array(4)
            .fill(1)
            .map((_, index) => (
              <GithubUserCardSkeleton key={index} />
            ))}
        </div>
      ) : (
        <>
          {isError ? (
            <Alert variant='destructive' className='text-center dark:text-red-700 dark:border-red-700'>
              Couldn't fetch user data. {`Error: ${error?.message}` || 'An error occurred when trying to fetch user data.'}. Reload the page and try again.
            </Alert>
          ) : (
            <>
              {isFetched && paginatedData?.length === 0 ? (
                <>
                  <Alert variant='destructive' className='text-center text-neutral-700 border-neutral-700 dark:text-neutral-300 dark:border-neutral-300'>
                    Everyone you follow is following you back.
                  </Alert>
                  <div className='p-10 flex justify-center items-center'>
                    <UserX size={125} className='text-neutral-200 dark:text-neutral-800' />
                  </div>
                </>
              ) : (
                <div className='flex flex-col gap-5'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                    {paginatedData?.filter((user: GithubUser) => user.login.toLowerCase().includes(filter.toLowerCase())).map((user: GithubUser) => (
                      <GithubUserCard key={user.login} data={user} />
                    ))}
                  </div>
                  {paginatedData !== undefined && (
                    <div>
                      <Pagination className='text-neutral-200 select-none flex flex-wrap'>
                        <PaginationContent className='flex flex-wrap'>
                          <PaginationPrevious
                            onClick={previous}
                            aria-disabled={currentPage === 1}
                            className='cursor-pointer bg-neutral-100 text-neutral-700 hover:bg-neutral-800 hover:text-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-200 dark:text-neutral-200 dark:hover:text-neutral-800'
                          />
                          {numberPages > 5 ? (
                            <>
                              {Array(5)
                                .fill(1)
                                .map((_, index) => (
                                  <PaginationLink
                                    onClick={() => page(index + 1)}
                                    key={index}
                                    isActive={currentPage === index + 1}
                                    className='cursor-pointer bg-neutral-100 text-neutral-700 hover:bg-neutral-800 hover:text-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-200 dark:text-neutral-200 dark:hover:text-neutral-800 dark:aria-[current=page]:bg-neutral-200 dark:aria-[current=page]:text-neutral-800 aria-[current=page]:bg-neutral-800 aria-[current=page]:text-neutral-200'
                                  >
                                    {index + 1}
                                  </PaginationLink>
                                ))}
                              <PaginationLink
                                onClick={() => page(6)}
                                isActive={currentPage >= 6}
                                className='cursor-pointer bg-neutral-100 text-neutral-700 hover:bg-neutral-800 hover:text-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-200 dark:text-neutral-200 dark:hover:text-neutral-800 dark:aria-[current=page]:bg-neutral-200 dark:aria-[current=page]:text-neutral-800 aria-[current=page]:bg-neutral-800 aria-[current=page]:text-neutral-200'
                              >
                                <MoreHorizontal className='h-4 w-4' />
                              </PaginationLink>
                            </>
                          ) : (
                            <>
                              {Array(numberPages)
                                .fill(1)
                                .map((_, index) => (
                                  <PaginationLink
                                    onClick={() => page(index + 1)}
                                    key={index}
                                    isActive={currentPage === index + 1}
                                    className='cursor-pointer bg-neutral-100 text-neutral-700 hover:bg-neutral-800 hover:text-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-200 dark:text-neutral-200 dark:hover:text-neutral-800 dark:aria-[current=page]:bg-neutral-200 dark:aria-[current=page]:text-neutral-800 aria-[current=page]:bg-neutral-800 aria-[current=page]:text-neutral-200'
                                  >
                                    {index + 1}
                                  </PaginationLink>
                                ))}
                            </>
                          )}

                          <PaginationNext
                            onClick={next}
                            aria-disabled={currentPage === numberPages}
                            className='cursor-pointer bg-neutral-100 text-neutral-700 hover:bg-neutral-800 hover:text-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-200 dark:text-neutral-200 dark:hover:text-neutral-800'
                          />
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}