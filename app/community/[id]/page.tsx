import { mockCommunities } from "@/src/data/mockData"
import CommunityPageClient from "@/src/components/community/CommunityPageClient"

// This function tells Next.js which community pages to generate at build time
export async function generateStaticParams() {
  // Get all approved communities from mock data
  const communities = mockCommunities.filter(c => c.status === "approved")
  
  // Return an array of objects with the id parameter for each community
  return communities.map((community) => ({
    id: community.id,
  }))
}

export default function CommunityPage({ params }: { params: { id: string } }) {
  return <CommunityPageClient id={params.id} />
}
