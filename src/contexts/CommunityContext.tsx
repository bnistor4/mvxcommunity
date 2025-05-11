"use client"

import { createContext, useState, useContext, type ReactNode } from "react"
import type { Community, Platform } from "../types/index.ts"
import { mockCommunities, pendingCommunities } from "../data/mockData"

interface CommunityContextType {
  communities: Community[]
  pendingCommunities: Community[]
  filteredCommunities: Community[]
  filterByPlatform: (platform: Platform | "") => void
  filterBySearch: (query: string) => void
  addCommunity: (
    community: Omit<Community, "id" | "status" | "badges" | "clickCount" | "createdAt" | "updatedAt">,
  ) => void
  approveCommunity: (id: string) => void
  rejectCommunity: (id: string) => void
  updateBadges: (id: string, badges: ("starred" | "on_fire")[]) => void
  incrementClickCount: (id: string) => void
  getCommunity: (id: string) => Community | undefined
  activeFilters: {
    platform: Platform | ""
    search: string
  }
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined)

export function CommunityProvider({ children }: { children: ReactNode }) {
  const [communities, setCommunities] = useState<Community[]>(mockCommunities)
  const [pending, setPending] = useState<Community[]>(pendingCommunities)
  const [activeFilters, setActiveFilters] = useState({
    platform: "" as Platform | "",
    search: "",
  })

  // Apply filters to get filtered communities
  const getFilteredCommunities = () => {
    let filtered = [...communities]

    if (activeFilters.platform) {
      filtered = filtered.filter((community) => community.platforms.includes(activeFilters.platform as Platform))
    }

    if (activeFilters.search) {
      const query = activeFilters.search.toLowerCase()
      filtered = filtered.filter(
        (community) =>
          community.name.toLowerCase().includes(query) || community.description.toLowerCase().includes(query),
      )
    }

    return filtered
  }

  const filteredCommunities = getFilteredCommunities()

  const filterByPlatform = (platform: Platform | "") => {
    setActiveFilters((prev) => ({ ...prev, platform }))
  }

  const filterBySearch = (query: string) => {
    setActiveFilters((prev) => ({ ...prev, search: query }))
  }

  const addCommunity = (
    communityData: Omit<Community, "id" | "status" | "badges" | "clickCount" | "createdAt" | "updatedAt">,
  ) => {
    const newCommunity: Community = {
      ...communityData,
      id: `pending-${Date.now()}`,
      status: "pending",
      badges: [],
      clickCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setPending((prev) => [...prev, newCommunity])
  }

  const approveCommunity = (id: string) => {
    const communityToApprove = pending.find((c) => c.id === id)

    if (communityToApprove) {
      const updatedCommunity = {
        ...communityToApprove,
        status: "approved" as const,
        id: `approved-${Date.now()}`,
        updatedAt: new Date().toISOString(),
      }

      setCommunities((prev) => [...prev, updatedCommunity])
      setPending((prev) => prev.filter((c) => c.id !== id))
    }
  }

  const rejectCommunity = (id: string) => {
    setPending((prev) => {
      const communityToReject = prev.find((c) => c.id === id)

      if (communityToReject) {
        return prev.map((c) =>
          c.id === id ? { ...c, status: "rejected" as const, updatedAt: new Date().toISOString() } : c,
        )
      }

      return prev.filter((c) => c.id !== id)
    })
  }

  const updateBadges = (id: string, badges: ("starred" | "on_fire")[]) => {
    setCommunities((prev) => prev.map((c) => (c.id === id ? { ...c, badges, updatedAt: new Date().toISOString() } : c)))
  }

  const incrementClickCount = (id: string) => {
    setCommunities((prev) =>
      prev.map((c) => (c.id === id ? { ...c, clickCount: c.clickCount + 1, updatedAt: new Date().toISOString() } : c)),
    )
  }

  const getCommunity = (id: string) => {
    return communities.find((c) => c.id === id) || pending.find((c) => c.id === id)
  }

  return (
    <CommunityContext.Provider
      value={{
        communities,
        pendingCommunities: pending,
        filteredCommunities,
        filterByPlatform,
        filterBySearch,
        addCommunity,
        approveCommunity,
        rejectCommunity,
        updateBadges,
        incrementClickCount,
        getCommunity,
        activeFilters,
      }}
    >
      {children}
    </CommunityContext.Provider>
  )
}

export function useCommunity() {
  const context = useContext(CommunityContext)
  if (context === undefined) {
    throw new Error("useCommunity must be used within a CommunityProvider")
  }
  return context
}
