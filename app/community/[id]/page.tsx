"use client"

import { useParams } from "next/navigation"
import CommunityDetail from "@/components/community/CommunityDetail"
import { useCommunity } from "@/src/contexts/CommunityContext"
import { redirect } from "next/navigation"

export default function CommunityPage() {
  const params = useParams()
  const id = params?.id as string
  const { getCommunity } = useCommunity()

  const community = getCommunity(id)

  if (!community || community.status !== "approved") {
    redirect("/")
  }

  return <CommunityDetail communityId={id} />
}
