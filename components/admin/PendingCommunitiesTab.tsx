"use client"

import type React from "react"
import { useState } from "react"
import { Check, X, ExternalLink } from "lucide-react"
import Button from "../common/Button"
import { useCommunity } from "@/src/contexts/CommunityContext"
import type { Community } from "@/src/types"
import { motion } from "framer-motion"
import { triggerConfetti } from "@/utils/confetti"

const PendingCommunitiesTab: React.FC = () => {
  const { pendingCommunities, approveCommunity, rejectCommunity } = useCommunity()

  if (pendingCommunities.length === 0) {
    return (
      <div className="text-center py-12">
        <motion.svg
          className="mx-auto h-16 w-16 text-secondary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </motion.svg>
        <motion.h3
          className="mt-4 text-xl font-bold text-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          All caught up!
        </motion.h3>
        <motion.p
          className="mt-2 text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          There are no pending communities to review.
        </motion.p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Review Pending Communities</h2>

      <motion.div
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {pendingCommunities.map((community, index) => (
          <motion.div
            key={community.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CommunityReviewCard
              community={community}
              onApprove={() => {
                approveCommunity(community.id)
                triggerConfetti()
              }}
              onReject={() => rejectCommunity(community.id)}
            />
          </motion.div>
        ))}
      </motion.div>
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
    <motion.div
      className={`brutal-card p-0 overflow-hidden transform rotate-[${rotation}deg]`}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
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
                <motion.span
                  key={platform}
                  className="brutal-badge bg-accent text-foreground"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </motion.span>
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
                      <motion.a
                        href={community.inviteLinks[platform]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center"
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {community.inviteLinks[platform].substring(0, 40)}
                        {community.inviteLinks[platform].length > 40 && "..."}
                        <ExternalLink size={14} className="ml-1" />
                      </motion.a>
                    </li>
                  ),
              )}
            </ul>
          </div>
        </div>

        <div>
          <div className="mb-6">
            <h4 className="text-lg font-bold text-foreground mb-2">Contact Email</h4>
            <motion.a
              href={`mailto:${community.submitterEmail}`}
              className="text-primary hover:underline brutal-border bg-white p-3 shadow-brutal-sm inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {community.submitterEmail}
            </motion.a>
          </div>

          <div>
            <h4 className="text-lg font-bold text-foreground mb-2">Community Image</h4>
            <motion.div
              className="brutal-border overflow-hidden"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={community.imageUrl || "/placeholder.svg"}
                alt={community.name}
                className="w-full h-40 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PendingCommunitiesTab
