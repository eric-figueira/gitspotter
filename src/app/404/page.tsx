import { Button } from '@/components/ui/button'
import { SearchX } from 'lucide-react'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div className='h-screen p-5 flex flex-col justify-center items-center gap-8 text-center text-neutral-200 bg-neutral-900'>
      <h1 className='font-semibold text-3xl md:text-4xl'>
        Oops, looks like you are lost...
      </h1>
      <SearchX
        size={80}
        className='drop-shadow-glow animate-flicker text-red-500'
      />
      <h2 className='font-medium text-2xl md:text-3xl'>
        The page you were looking for does not exists.
      </h2>
      <Link href='/'>
        <Button 
          variant='destructive'
          size='lg'
          className='text-md'
        >
          Back to where I was
        </Button>
      </Link>
    </div>
  )
}