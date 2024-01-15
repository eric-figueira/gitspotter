import GithubUser from '@/lib/types/GithubUser'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const axiosConfiguration = {
  headers: {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_PERSONAL_ACCESS_TOKEN}`
  }
}

export default function useNonFollowers(u: string) {
  
  const { data, isError, error, isFetching, isFetched, refetch } = useQuery<GithubUser[]>({ 
    queryKey: ['user-non-followers'],
    queryFn: fetchNonFollowers,
    enabled: false,
    retry: false,
  })

  async function fetchNonFollowers() {
    const user_response = await axios
      .get(`https://api.github.com/users/${u}`, axiosConfiguration)

    const user: GithubUser = user_response.data

    const following_url = user.following_url.split('{')[0]  

    let results: GithubUser[] = []
    let continues = false
    let page = 1
    
    do 
    {
      const following_response = await axios.get(`${following_url}?per_page=100&page=${page}`, axiosConfiguration)
      const following: GithubUser[] = following_response.data

      const inPage = await Promise.all(
        following.map(async (other: GithubUser) => {
          const clean_url = other.following_url.split('{')[0]
          try {
            const following_response = await axios.get(`${clean_url}/${user.login}`, axiosConfiguration)
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

      inPage.length === 100 ? continues = true : continues = false
      
      page += 1
      results = results.concat(inPage)

    } while (continues && page < 5)

    console.clear()
    const nonFollowers = results.filter((user: GithubUser) => !user.followsBack)
    
    return nonFollowers
  }

  return { data, isError, error, isFetching, isFetched, refetch }
}