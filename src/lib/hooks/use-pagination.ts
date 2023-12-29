import GithubUser from '@/lib/types/GithubUser'
import { useEffect, useState } from 'react'

export default function usePagination(original: GithubUser[]) {
  
  const [currentPage, setCurrentPage]     = useState<number>(1)
  const [numberPages, setNumberPages]     = useState<number>(1)
  const [paginatedData, setPaginatedData] = useState<GithubUser[]>([])
  const perPage = 20

  useEffect(() => {
    if (original !== undefined) {
      setNumberPages(Math.ceil(original.length / perPage))
      const d = original.slice(0, perPage)
      setPaginatedData(d)
    }
  }, [original])

  useEffect(() => {
    if (original !== undefined) {
      const d = original.slice((currentPage - 1) * perPage, currentPage * perPage)
      setPaginatedData(d)
    }
  }, [currentPage])

  function previous() { if (currentPage > 1) setCurrentPage(p => p - 1) }
  function next() { if (currentPage < numberPages) setCurrentPage(p => p + 1)  }
  function page(p: number) { setCurrentPage(p) }
  
  return { paginatedData, numberPages, currentPage, previous, next, page }
}