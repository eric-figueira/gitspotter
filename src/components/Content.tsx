'use client'

import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import GithubUser from "@/lib/types/GithubUser";
import GithubUserCard from "./GithubUserCard";
import { Alert } from "./ui/alert";
import GithubUserCardSkeleton from "./GithubUserCard-Skeleton";
import useNonFollowers from "@/lib/hooks/useNonFollowers";
import { Search } from "lucide-react";

export default function Content() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState<string>('');

  const { data, isError, error, isLoading, refetch, isFetched } = useNonFollowers(usernameRef)

  const handleSearchUser = async () => { 
    if (usernameRef.current && usernameRef.current.value.trim() !== '') {
      await refetch();
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-1/2 flex flex-row gap-3">
          <Input 
            className="bg-neutral-800 border-neutral-700 focus:border-neutral-600 text-neutral-200 text-md"
            placeholder="Type your Github username..."
            ref={usernameRef}
          />
          <Button 
            className="flex gap-2 bg-emerald-600 w-28 hover:bg-emerald-600/70"
            disabled={isLoading}
            onClick={handleSearchUser}
          >
            <Search size={18} strokeWidth={3} />
            <span>Search</span>
          </Button>
        </div>
        <div className="w-full md:w-1/2">
          <Input 
            className="bg-neutral-800 border-neutral-700 text-neutral-200 text-md"
            placeholder="Find someone you think doesn't follow you..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
      <div>
        {isError && (
          <>
            <Alert variant='destructive'>
              Couldn't fetch user data. Error: {error?.message}
            </Alert>
          </>
        )}
        {isLoading && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {Array(4)
                .fill(1)
                .map((_, index) => (
                  <GithubUserCardSkeleton key={index} />
              ))}
            </div>
          </>
        )}
        {isFetched && (
          <>
            {data?.length === 0 ? (
              <Alert variant='destructive' className="text-center text-neutral-300 border-neutral-300">
                There is no one that you follow that does not follow you back.
              </Alert>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {data?.filter((user: GithubUser) => user.login.toLowerCase().includes(filter.toLowerCase())).map((user: GithubUser) => (
                  <GithubUserCard key={user.login} data={user} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
