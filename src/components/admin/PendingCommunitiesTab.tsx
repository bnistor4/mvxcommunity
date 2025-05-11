"use client"

import type React from "react"
import { Check, X, ExternalLink } from "lucide-react"
import Button from "../common/Button"
import { useCommunity } from "@/src/contexts/CommunityContext"
import type { Community } from "../../types"

const PendingCommunitiesTab: React.FC = () => {
  const { pendingCommunities, approveCommunity, rejectCommunity } = useCommunity()

  if (pendingCommunities.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-16 w-16 text-secondary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-4 text-xl font-bold text-foreground">All caught up!</h3>
        <p className="mt-2 text-lg">There are no pending communities to review.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Review Pending Communities</h2>

      <div className="space-y-8">
        {pendingCommunities.map((community) => (
          <CommunityReviewCard
            key={community.id}
            community={community}
            onApprove={() => approveCommunity(community.id)}
            onReject={() => rejectCommunity(community.id)}
          />
        ))}
      </div>
    </div>
  )
}

interface CommunityReviewCardProps {
  community: Community
  onApprove: () => void
  onReject: () => void
}

const CommunityReviewCard: React.FC<CommunityReviewCardProps> = ({ community, onApprove, onReject }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Generate a random rotation between -1 and 1 degrees for subtle tilt
  const rotation = Math.floor(Math.random() * 3) - 1

  return (
    <div className={`brutal-card p-0 overflow-hidden transform rotate-[${rotation}deg]`}>
      <div className="px-6 py-4 bg-secondary brutal-border border-t-0 border-l-0 border-r-0 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-foreground">{community.name}</h3>
          <p className="text-foreground">Submitted on {formatDate(community.createdAt)}</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="primary" leftIcon={<Check size={18} />} onClick={onApprove}>
            Approve
          </Button>
          <Button variant="danger" leftIcon={<X size={18} />} onClick={onReject}>
            Reject
          </Button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="mb-6">
            <h4 className="text-lg font-bold text-foreground mb-2">Description</h4>
            <p className="text-foreground brutal-border bg-white p-4 shadow-brutal-sm">{community.description}</p>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-bold text-foreground mb-2">Platforms</h4>
            <div className="flex flex-wrap gap-2">
              {community.platforms.map((platform) => (
                <span key={platform} className="brutal-badge bg-accent text-foreground">
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-foreground mb-2">Invite Links</h4>
            <ul className="space-y-2 brutal-border bg-white p-4 shadow-brutal-sm">
              {community.platforms.map(
                (platform) =>
                  community.inviteLinks[platform] && (
                    <li key={platform} className="flex items-center">
                      <span className="font-bold text-foreground mr-2">
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}:
                      </span>
                      <a
                        href={community.inviteLinks[platform]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center"
                      >
                        {community.inviteLinks[platform].substring(0, 40)}
                        {community.inviteLinks[platform].length > 40 && "..."}
                        <ExternalLink size={14} className="ml-1" />
                      </a>
                    </li>
                  ),
              )}
            </ul>
          </div>
        </div>

        <div>
          <div className="mb-6">
            <h4 className="text-lg font-bold text-foreground mb-2">Contact Email</h4>
            <a
              href={`mailto:${community.submitterEmail}`}
              className="text-primary hover:underline brutal-border bg-white p-3 shadow-brutal-sm inline-block"
            >
              {community.submitterEmail}
            </a>
          </div>

          <div>
            <h4 className="text-lg font-bold text-foreground mb-2">Community Image</h4>
            <div className="brutal-border overflow-hidden">
              <img
                src={community.imageUrl || "/placeholder.svg"}
                alt={community.name}
                className="w-full h-40 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PendingCommunitiesTab
