'use client'

import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import GithubUser from "@/lib/types/GithubUser";
import GithubUserCard from "./GithubUserCard";
import { Alert } from "./ui/alert";
import GithubUserCardSkeleton from "./GithubUserCard-Skeleton";

export default function Content() {
  const usernameRef = useRef<HTMLInputElement>(null);

  const { data, isError, error, isLoading, refetch, isFetched } = useQuery<GithubUser[]>({ 
    queryKey: ['user-followers'],
    queryFn: fetchData,
    enabled: false,
    retry: false,
  })

  async function fetchData() {
    const user_response = await axios
      .get(`https://api.github.com/users/${usernameRef.current!.value}`, { headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_PERSONAL_ACCESS_TOKEN}`
      } });
    const user: GithubUser = user_response.data;

    const following_url = user.following_url.split('{')[0];
    
    const following_response = await axios.get(`${following_url}?per_page=100`, { headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_PERSONAL_ACCESS_TOKEN}`
    } });
    const following: GithubUser[] = following_response.data;

    const results = await Promise.all(
      following.map(async (other: GithubUser) => {
        const clean_url = other.following_url.split('{')[0];
        try {
          const following_response = await axios.get(`${clean_url}/${user.login}`, { headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_PERSONAL_ACCESS_TOKEN}`
          } });
          return {
            ...other,
            followsBack: following_response.status === 204,
          }
        } catch (error) {
          return {
            ...other,
            followsBack: false,
          }
        }
      })
    )

    console.clear();
    const nonFollowers = results.filter((user: GithubUser) => !user.followsBack);
    
    return nonFollowers;
    // await new Promise((resolve) => setTimeout(resolve, 50000));

    // return [];
  }

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
            className="bg-emerald-600 w-28 hover:bg-emerald-600/70"
            disabled={isLoading}
            onClick={handleSearchUser}
          >
            Search
          </Button>
        </div>
        <div className="w-full md:w-1/2">
          <Input 
            className="bg-neutral-800 border-neutral-700 text-neutral-200 text-md"
            placeholder="Find someone you think doesn't follow you..."
          />
        </div>
      </div>
      <div>
        {isError && (
          <>
            <Alert variant='destructive'>
              Couldn't fetch user data. Error: {error.message}
            </Alert>
          </>
        )}
        {isLoading && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {data?.map((user: GithubUser) => (
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
