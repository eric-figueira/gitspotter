import Image from 'next/image'
import { ThemeSwitcher } from '../ThemeSwitcher'
import { Suspense } from 'react'
import { Skeleton } from '../ui'

export function Header() {

  return (
    <div className='border-b border-neutral-300 bg-neutral-100 dark:border-neutral-700 px-10 py-5 dark:bg-neutral-900'>
      <div className='flex items-center justify-between'>
        <div>
          <div className='flex gap-3 items-center'>
            <Suspense fallback={<Skeleton  className='h-10 w-10 bg-neutral-700 dark:bg-neutral-400 rounded-full' />}>
              <Image
                src='/gitmate-logo.png'
                alt='Gitmate Logo'
                width={35}
                height={35}
                className='bg-white rounded-full p-[2px] border border-neutral-300'
                draggable={false}
              />
            </Suspense>
            <h1 className='text-2xl md:text-3xl font-semibold text-neutral-800 dark:text-neutral-200 cursor-default'>Gitmate</h1>
          </div>
        </div>
        <ThemeSwitcher />
      </div>
    </div>
  )
}