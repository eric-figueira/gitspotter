import GithubUser from "@/lib/types/GithubUser";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";

interface IGithubUserCardProps {
  data: GithubUser
}

export default function GithubUserCard({ data }: IGithubUserCardProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-5 p-5 border-neutral-600 border-[2px] rounded-lg w-full">
        <div className="flex justify-center items-center">
          <Avatar className="w-20 h-20 border-2 border-emerald-600">
            <AvatarImage src={data.avatar_url} alt={data.name} />
            <AvatarFallback>
              <Skeleton className="h-20 w-20 rounded-full" />
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <p className='text-xl break-words text-neutral-300 text-center md:w-fit mb-5'>{data.login}</p>
          <a href={data.html_url} className="no-underline text-white" target="_blank">
            <Button
              className="flex gap-2 max-sm:w-full w-fit bg-emerald-600  hover:bg-emerald-600/70"
              size='sm'
            >
              <span>Visit Profile</span>
              <ExternalLink size={16} strokeWidth={3} />
            </Button>
          </a>
        </div>
      </div>
    </>
  )
}