'use client'

import { Sun, Moon } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui'
import { useTheme } from 'next-themes'

export function Header() {
  const { theme, setTheme } = useTheme()

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
        <div>
          <Button 
            className='border border-neutral-300 bg-neutral-100 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-200 group' 
            size='icon'
            onClick={() => {
              theme == 'dark' ? setTheme('light') : setTheme('dark')
            }}
          >
            {theme == 'dark' 
            ? <Sun className='dark:text-neutral-200 group-hover:text-neutral-900' /> 
            : <Moon className='text-neutral-900 group-hover:text-neutral-200' />}
          </Button>
        </div>
      </div>
    </div>
  )
}