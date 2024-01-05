'use client'

import { Sun, Moon } from 'lucide-react'
import Image from 'next/image'
import { Button, Skeleton } from '../ui'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <div className='border-b border-neutral-300 bg-neutral-100 dark:border-neutral-700 px-10 py-5 dark:bg-neutral-900'>
      <div className='flex items-center justify-between'>
        <div>
          <div className='flex gap-3 items-center'>
            <Image
              src='/gitmate-logo.png'
              alt='Gitmate Logo'
              width={35}
              height={35}
              className='bg-white rounded-full p-[2px] border border-neutral-300'
              draggable={false}
            />
            <h1 className='text-2xl md:text-3xl font-semibold text-neutral-800 dark:text-neutral-200 cursor-default'>Gitmate</h1>
          </div>
        </div>
        {mounted ? (
          <div>
            <Button
              className='border border-neutral-700'
              size='icon'
              onClick={() => {
                theme == 'dark' ? setTheme('light') : setTheme('dark')
              }}
            >
              {theme == 'dark' ? <Sun /> : <Moon />}
            </Button>
          </div>
        ): (
          <div>
            <Skeleton className='h-10 w-10 bg-neutral-700 dark:bg-neutral-400' />
          </div>
        )}
      </div>
    </div>
  )
}