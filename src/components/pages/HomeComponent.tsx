'use client'

import { useRef, useState } from 'react'
import { Button, Input, Alert, Label } from '@/components/ui'
import GithubUser from '@/lib/types/GithubUser'
import GithubUserCard from '@/components/GithubUserCard'
import GithubUserCardSkeleton from '@/components/GithubUserCard-Skeleton'
import useNonFollowers from '@/lib/hooks/useNonFollowers'
import { Search, UserX } from 'lucide-react'

export default function HomeComponent() {
  const usernameRef = useRef<HTMLInputElement>(null)
  const [filter, setFilter] = useState<string>('')

  const { data, isError, error, isFetching, refetch } = useNonFollowers(usernameRef)

  const handleSearchUser = async () => { 
    if (usernameRef.current && usernameRef.current.value.trim() !== '') {
      await refetch()
    }
  }

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col md:flex-row gap-3 md:gap-5'>
        <div className='w-full md:w-1/2 flex flex-row items-end gap-3'>
          <div className='w-full flex flex-col gap-2'>
            <Label className='text-neutral-200 text-sm'>Github Username</Label>
            <Input 
              className='bg-neutral-800 border-neutral-700 focus:border-neutral-600 text-neutral-200 text-md'
              placeholder='Type your Github username...'
              ref={usernameRef}
            />
          </div>
          <Button 
            className='flex gap-2 bg-emerald-600 w-28 hover:bg-emerald-600/70'
            disabled={isFetching}
            onClick={handleSearchUser}
          >
            <Search size={18} strokeWidth={3} />
            <span>Search</span>
          </Button>
        </div>
        <div className='w-full md:w-1/2'>
          <div className='w-full flex flex-col gap-2'>
            <Label className='text-neutral-200 text-sm'>NonFollower Username</Label>
            <Input 
              className='bg-neutral-800 border-neutral-700 text-neutral-200 text-md'
              placeholder="Check if someone does not follow you back..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              disabled={data === undefined || data?.length === 0}
            />
          </div>
        </div>
      </div>
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
              <Alert variant='destructive' className='text-center'>
                Couldn't fetch user data. {`Error: ${error?.message}` || 'An error occurred when trying to fetch user data.'}
              </Alert>
            ) : (
              <>
                {data?.length === 0 ? (
                  <>
                    <Alert variant='destructive' className='text-center text-neutral-300 border-neutral-300'>
                      Everyone you follow is following you back.
                    </Alert>
                    <div className='p-10 flex justify-center items-center'>
                      <UserX size={125} className='text-neutral-800' />
                    </div>
                  </>
                ) : (
                  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                    {data?.filter((user: GithubUser) => user.login.toLowerCase().includes(filter.toLowerCase())).map((user: GithubUser) => (
                      <GithubUserCard key={user.login} data={user} />
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
