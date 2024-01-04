'use client'

import { Sun, Moon } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui'
import { useTheme } from 'next-themes'

export function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <div className='border-b border-neutral-700 px-10 py-5 bg-neutral-900'>
      <div className='flex items-center justify-between'>
        <div>
          <div className='flex gap-3 items-center'>
            <Image
              src='/gitmate-logo.png'
              alt='Gitmate Logo'
              width={35}
              height={35}
              className='bg-white rounded-full p-[2px]'
              draggable={false}
            />
            <h1 className='text-2xl md:text-3xl font-semibold text-white cursor-default'>Gitmate</h1>
          </div>
        </div>
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
      </div>
    </div>
  )
}