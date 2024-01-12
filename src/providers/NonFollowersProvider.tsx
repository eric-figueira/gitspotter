'use client'

import { NonFollowersProvider as NonFollowersContext } from "@/contexts/NonFollowersContext"

export default function NonFollowersProvider({ children }: { children: React.ReactNode }) {
  return (
    <NonFollowersContext>
      {children}
    </NonFollowersContext>
  )
}