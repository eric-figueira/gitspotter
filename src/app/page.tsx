import Results from '@/components/Results'
import UsernamesInputs from '@/components/UsernamesInputs'
import NonFollowersProvider from '@/providers/NonFollowersProvider'

export default function Home() {
  return (
    <main className='min-h-screen bg-neutral-100 dark:bg-neutral-900'>
      <div className='px-10 py-5 flex flex-col gap-5'>
        <div>
          <p className='text-md md:text-lg text-neutral-700 dark:text-neutral-300 cursor-default'>Type your GitHub username and spot those who are not following you back.</p>
        </div>
        <div>
          <NonFollowersProvider>
            <div className='flex flex-col gap-5'>
              <UsernamesInputs />
              <Results />
            </div>
          </NonFollowersProvider>
        </div>
      </div>
    </main>
  )
}
