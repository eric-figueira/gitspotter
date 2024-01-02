import HomeComponent from '@/components/pages/HomeComponent'
import Image from 'next/image'

export default function Home() {
  return (
    <main className='min-h-screen bg-neutral-900'>
      <div className='p-10 flex flex-col gap-5'>
        <div>
          <div className='flex gap-3 items-center'>
            <Image 
              src='/gitmate-logo.png'
              alt='Gitmate Logo'
              width={40}
              height={40}
              className='bg-white rounded-full p-[2px]'
              draggable={false}
            />
            <h1 className='text-3xl md:text-4xl font-semibold text-white cursor-default'>Gitmate</h1>
          </div>
          <p className='text-md md:text-lg text-neutral-300 mt-5 cursor-default'>Type your GitHub username and spot those who are not following you back.</p>
        </div>

        <div>
          <HomeComponent />
        </div>
      </div>
    </main>
  )
}
