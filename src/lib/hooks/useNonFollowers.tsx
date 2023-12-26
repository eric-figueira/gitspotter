import GithubUser from "../types/GithubUser";
import axios from "axios";
import { QueryCache, useQuery, useQueryClient } from "@tanstack/react-query";

const axiosConfiguration = {
  headers: {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_PERSONAL_ACCESS_TOKEN}`
  }
}

export default function useNonFollowers(ref: React.RefObject<HTMLInputElement>) {
  const queryClient = useQueryClient();
  const inputReference: React.RefObject<HTMLInputElement> = ref;

  const { data, isError, error, isFetching, refetch } = useQuery<GithubUser[]>({ 
    queryKey: ['user-non-followers'],
    queryFn: fetchNonFollowers,
    enabled: false,
    retry: false,
    throwOnError: false,
  });

  async function fetchNonFollowers() {
    const user_response = await axios
      .get(`https://api.github.com/users/${inputReference.current!.value}`, axiosConfiguration);
    
    if (user_response.status === 404) { throw new Error('aaRequest failed with status code 404. User not found.') }

    const user: GithubUser = user_response.data;

    const following_url = user.following_url.split('{')[0];
    
    const following_response = await axios.get(`${following_url}?per_page=100`, axiosConfiguration);
    const following: GithubUser[] = following_response.data;

    const results = await Promise.all(
      following.map(async (other: GithubUser) => {
        const clean_url = other.following_url.split('{')[0];
        try {
          const following_response = await axios.get(`${clean_url}/${user.login}`, axiosConfiguration);
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
  }

  async function clearData() {
    queryClient.setQueryData(['user-non-followers'], undefined);
  }

  return { data, isError, error, isFetching, refetch, clearData }
}