"use client"

import type React from "react"
import Link from "next/link"
import { ArrowLeft, ExternalLink, MessageCircle, Twitter, Share2 } from "lucide-react"
import Button from "@/src/components/common/Button"
import Badge from "@/src/components/common/Badge"
import { useCommunity } from "@/src/contexts/CommunityContext"
import type { Platform } from "@/src/types"
import { motion } from "framer-motion"

interface CommunityDetailProps {
  communityId: string
}

const CommunityDetail: React.FC<CommunityDetailProps> = ({ communityId }) => {
  const { getCommunity, incrementClickCount } = useCommunity()

  const community = getCommunity(communityId)

  if (!community) {
    return null
  }

  const handleJoinClick = (platform: Platform) => {
    incrementClickCount(community.id)
    window.open(community.inviteLinks[platform], "_blank")
  }

  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Join ${community.name} on MultiversX`,
          text: `Check out ${community.name}, a MultiversX community!`,
          url: window.location.href,
        })
        .catch((err) => {
          console.error("Error sharing:", err)
        })
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          alert("Link copied to clipboard!")
        })
        .catch((err) => {
          console.error("Failed to copy:", err)
        })
    }
  }

  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case "telegram":
        return <MessageCircle size={20} />
      case "discord":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.127 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
          </svg>
        )
      case "x":
        return <Twitter size={20} />
      default:
        return <ExternalLink size={20} />
    }
  }

  const getPlatformName = (platform: Platform) => {
    switch (platform) {
      case "telegram":
        return "Telegram"
      case "discord":
        return "Discord"
      case "x":
        return "X (Twitter)"
      default:
        return "Other"
    }
  }

  // Generate a random rotation between -1 and 1 degrees for subtle tilt
  const rotation = Math.floor(Math.random() * 3) - 1

  return (
    <div className="container mx-auto px-4 py-16">
      <Link
        href="/"
        className="inline-flex items-center text-foreground hover:text-primary transition-colors mb-8 brutal-border px-4 py-2 shadow-brutal-sm hover:shadow-brutal"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Communities
      </Link>

      <motion.div
        className={`brutal-card p-0 overflow-hidden transform rotate-[${rotation}deg]`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header with Image */}
        <div className="relative h-48 sm:h-72 bg-primary">
          <img
            src={community.imageUrl || "/placeholder.svg"}
            alt={community.name}
            className="w-full h-full object-cover mix-blend-multiply opacity-80"
          />

          {/* Badges */}
          {community.badges.length > 0 && (
            <div className="absolute top-4 right-4 flex space-x-2">
              {community.badges.includes("starred") && <Badge variant="starred">Starred</Badge>}
              {community.badges.includes("on_fire") && <Badge variant="onFire">On Fire</Badge>}
            </div>
          )}
        </div>

        <div className="p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-black text-foreground mb-4">{community.name}</h1>
              <div className="flex flex-wrap gap-2">
                {community.platforms.map((platform) => (
                  <motion.div key={platform} whileHover={{ y: -3 }} whileTap={{ y: 0 }}>
                    <Badge variant="platform" className="flex items-center">
                      <span className="mr-1">{getPlatformIcon(platform)}</span>
                      {getPlatformName(platform)}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              leftIcon={<Share2 size={16} />}
              onClick={handleShareClick}
              className="sm:self-start"
            >
              Share
            </Button>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-bold text-foreground mb-4 brutal-border inline-block px-3 py-1 bg-secondary">
              About
            </h2>
            <p className="text-foreground text-lg whitespace-pre-line">{community.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-6 brutal-border inline-block px-3 py-1 bg-secondary">
              Join Community
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {community.platforms.map(
                (platform) =>
                  community.inviteLinks[platform] && (
                    <Button
                      key={platform}
                      variant={platform === community.platforms[0] ? "primary" : "outline"}
                      leftIcon={getPlatformIcon(platform)}
                      onClick={() => handleJoinClick(platform)}
                      className={`justify-center ${platform === community.platforms[0] ? "rotate-1" : "-rotate-1"}`}
                    >
                      Join on {getPlatformName(platform)}
                    </Button>
                  ),
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="fixed bottom-10 left-10 w-16 h-16 bg-secondary brutal-border rotate-12 hidden lg:block"></div>
      <div className="fixed top-40 right-10 w-12 h-12 bg-accent brutal-border -rotate-6 hidden lg:block"></div>
    </div>
  )
}

export default CommunityDetail
