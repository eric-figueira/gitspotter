'use client'

import { useRef, useState } from 'react'
import { Button, Input, Label } from '@/components/ui'
import { Search } from 'lucide-react'
import { isValidUsername } from '@/lib/utils'
import { useNonFollowersResults } from '@/contexts/NonFollowersContext'

export default function UsernamesInputs() {
  const usernameRef = useRef<HTMLInputElement>(null)
  const [showInvalidUsernameError, setShowInvalidUsernameError] = useState(false)

  let { filter, isFetching, paginatedData } = useNonFollowersResults()
  const { fetchUser, updateFilter } = useNonFollowersResults()

  const handleSearchUser = async () => { 
    if (usernameRef.current && usernameRef.current.value.trim() !== '') {
      await fetchUser(usernameRef.current.value)
    }
  }

  return (
    <div className='flex flex-col md:flex-row gap-3 md:gap-5'>
        <div className='w-full md:w-1/2 flex flex-col gap-2'>
          <Label className='text-neutral-800 dark:text-neutral-200 text-sm'>GitHub Username</Label>
          <div className='flex flex-row gap-3'>
            <Input
              className='bg-neutral-200 border-neutral-400 text-neutral-800 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 text-md'
              placeholder='Type your GitHub username...'
              ref={usernameRef}
              onChange={(e) => setShowInvalidUsernameError(!isValidUsername(e.target.value))}
            />
            <Button
              className='flex gap-2 bg-emerald-600 w-28 hover:bg-emerald-600/70 text-neutral-200'
              disabled={isFetching || showInvalidUsernameError}
              onClick={handleSearchUser}
            >
              <Search size={18} strokeWidth={3} />
              <span>Search</span>
            </Button>
          </div>
          <Label 
            className='text-red-500 dark:text-red-700 font-semibold text-sm'
            hidden={!showInvalidUsernameError}
          >
            Invalid GitHub Username
          </Label>
        </div>
        <div className='w-full md:w-1/2'>
          <div className='w-full flex flex-col gap-2'>
            <Label className='text-neutral-800 dark:text-neutral-200 text-sm'>NonFollower Username</Label>
            <Input 
              className='bg-neutral-200 border-neutral-400 text-neutral-800 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 text-md'
              placeholder='Check if someone does not follow you back...'
              value={filter}
              onChange={(e) => updateFilter(e.target.value)}
              disabled={paginatedData === undefined || paginatedData?.length === 0 || isFetching}
            />
          </div>
        </div>
      </div>
  )
}