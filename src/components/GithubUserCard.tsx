import GithubUser from "@/lib/types/GithubUser";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

interface IGithubUserCardProps {
  data: GithubUser
}

export default function GithubUserCard({ data }: IGithubUserCardProps) {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-5 p-5 border-neutral-600 border-[2px] rounded-lg w-full">
        <div className="w-fit">
          <Avatar className="w-16 h-16">
            <AvatarImage src={data.avatar_url} alt={data.name} />
            <AvatarFallback>
              <Skeleton className="h-12 w-12 rounded-full" />
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <p className='text-xl text-neutral-300 w-fit mb-5'>{data.login}</p>
          <a href={data.html_url} className="no-underline text-white" target="_blank">
            <Button
              className="bg-emerald-600 w-28 hover:bg-emerald-600/70"
              size='sm'
            >
              Visit Profile
            </Button>
          </a>
        </div>
      </div>
    </>
  )
}