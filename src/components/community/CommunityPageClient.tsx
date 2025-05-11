"use client"

import CommunityDetail from "./CommunityDetail"
import { useCommunity } from "@/src/contexts/CommunityContext"
import { redirect } from "next/navigation"

interface CommunityPageClientProps {
  id: string
}

export default function CommunityPageClient({ id }: CommunityPageClientProps) {
  const { getCommunity } = useCommunity()
  const community = getCommunity(id)

  if (!community || community.status !== "approved") {
    redirect("/")
  }

  return <CommunityDetail communityId={id} />
} 