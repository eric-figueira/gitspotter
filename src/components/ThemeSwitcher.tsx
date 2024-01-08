'use client'

import { Sun, Moon } from 'lucide-react'
import { Button, Skeleton } from '@/components/ui'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <div>
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
      ) : (
        <div>
          <Skeleton className='h-10 w-10 bg-neutral-700 dark:bg-neutral-400' />
        </div>
      )}
    </div>
  )
}