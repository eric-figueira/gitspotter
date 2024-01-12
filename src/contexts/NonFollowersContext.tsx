import useNonFollowers from "@/lib/hooks/use-non-followers";
import usePagination from "@/lib/hooks/use-pagination";
import GithubUser from "@/lib/types/GithubUser";
import { createContext, useContext, useState } from "react";

interface INonFollowersContext {
  filter: string;
  updateFilter: (f: string) => void;
  isError: boolean;
  error: Error | null,
  isFetching: boolean;
  isFetched: boolean;
  paginatedData: GithubUser[];
  numberPages: number;
  currentPage: number;
  previous: () => void;
  next: () => void;
  page: (p: number) => void;
  fetchUser: (u: string) => void;
}

export const NonFollowersContext = createContext({} as INonFollowersContext);

export function NonFollowersProvider({ children }: { children: React.ReactNode }) {

  const [username, setUsername] = useState<string>('')
  const [filter, setFilter] = useState<string>('')

  const { data, isError, error, isFetching, isFetched, refetch } = useNonFollowers(username)
  const { paginatedData, numberPages, currentPage, previous, next, page } = usePagination(data!)

  const fetchUser = async (u: string) => {
    if (u !== undefined && u.trim() !== '') { 
      setUsername(u) 
      await new Promise(resolve => setTimeout(resolve, 1))
      //alert(u)
      //alert(username)
      await refetch()
    }
  }

  const updateFilter = (f: string) => { setFilter(f) }

  return (
    <NonFollowersContext.Provider
      value={{
        filter,
        updateFilter,
        isError,
        error,
        isFetching,
        isFetched,
        paginatedData,
        numberPages,
        currentPage,
        previous,
        next,
        page,
        fetchUser
      }}
    >
      {children}
    </NonFollowersContext.Provider>
  )
}

export const useNonFollowersResults = () => {
  return useContext(NonFollowersContext)
}