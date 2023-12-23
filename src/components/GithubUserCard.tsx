import GithubUser from "@/lib/types/GithubUser";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";
import { Badge } from "./ui/badge";

interface IGithubUserCardProps {
  data: GithubUser
}

export default function GithubUserCard({ data }: IGithubUserCardProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-5 p-5 border-neutral-600 hover:border-neutral-400 border-[2px] rounded-lg w-full transition">
        <div className="flex justify-center items-center">
          <Avatar className="w-20 h-20 border-2 border-emerald-600">
            <AvatarImage src={data.avatar_url} alt={data.login} />
            <AvatarFallback>
              <Skeleton className="h-20 w-20 rounded-full" />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex flex-col md:flex-row items-center gap-2 mb-5">
            <p className='text-xl break-all text-neutral-300 md:w-fit'>{data.login}</p>
            <Badge 
              className="text-neutral-200 bg-slate-800 hover:bg-slate-800 rounded-md text-sm h-fit"
            >{data.type.toLowerCase()}</Badge>
          </div>
          <a href={data.html_url} className="no-underline text-white" target="_blank">
            <Button
              className="flex gap-2 max-sm:w-full w-fit bg-emerald-600 hover:bg-emerald-600/70"
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