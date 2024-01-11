import { ThemeSwitcher } from '../ThemeSwitcher'
import { UserSearch } from 'lucide-react'

export function Header() {

  return (
    <div className='border-b border-neutral-300 bg-neutral-100 dark:border-neutral-700 px-10 py-5 dark:bg-neutral-900'>
      <div className='flex items-center justify-between'>
        <div>
          <div className='flex gap-3 items-center'>
            <UserSearch size={30} />
            <h1 className='text-2xl md:text-3xl font-medium text-neutral-800 dark:text-neutral-200 cursor-default'>GitSpotter</h1>
          </div>
        </div>
        <ThemeSwitcher />
      </div>
    </div>
  )
}