'use client'

import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";

export default function Content() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [user, setUser] = useState();

  const handleSearchUser = async () => { 
    if (usernameRef.current && usernameRef.current.value.trim() !== '') {
      alert(usernameRef.current!.value);
      setIsLoading(true);
      const resp = await axios.get('https://api.github.com/users/eric-figueira');
      setIsLoading(false);
      setUser(resp.data);
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
        {isLoading ? (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) :
          <div>
            {user}
          </div>
        }
      </div>
    </div>
  )
}
