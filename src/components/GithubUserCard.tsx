import GithubUser from '@/lib/types/GithubUser'
import { Building, ExternalLink, User } from 'lucide-react'
import { Button, Skeleton, Badge, Avatar, AvatarFallback, AvatarImage } from '@/components/ui'

interface IGithubUserCardProps {
  data: GithubUser
}

export default function GithubUserCard({ data }: IGithubUserCardProps) {
  return (
    <>
      <div className='flex flex-col justify-center md:flex-row md:justify-between items-center gap-2 p-5 group border-neutral-600 hover:border-neutral-400 border-[2px] rounded-lg w-full transition'>
        <div className='flex flex-col md:flex-row justify-center gap-5 flex-wrap'>
          <div className='flex justify-center items-center'>
            <Avatar className='w-20 h-20 border-2 border-emerald-600'>
              <AvatarImage src={data.avatar_url} alt={data.login} />
              <AvatarFallback>
                <Skeleton className='h-20 w-20 rounded-full' />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className='flex flex-col justify-center gap-3'>
            <div className='max-md:flex flex-row flex-wrap justify-center items-center gap-3'>
              <p className='text-xl max-md:text-center break-all text-neutral-300 md:w-fit'>{data.login}</p>
              <Badge 
                className='md:hidden text-neutral-200 bg-slate-800 hover:bg-slate-800 rounded-md text-sm h-fit'
              >{data.type.toLowerCase()}</Badge>
            </div>
            <a href={data.html_url} className='max-md:mx-auto no-underline text-white' target='_blank'>
              <Button
                className='flex gap-2 max-sm:w-full max-w-fit bg-emerald-600 hover:bg-emerald-600/70'
                size='sm'
              >
                <span>Visit Profile</span>
                <ExternalLink size={16} strokeWidth={3} />
              </Button>
            </a>
          </div>
        </div>
        <div className='hidden md:flex justify-center items-center text-neutral-500 group-hover:text-neutral-400'>
          {data.type === 'User' ? (
            <User size={30} />
          ) : (
            <Building size={30} />
          )}
        </div>
      </div>
    </>
  )
}