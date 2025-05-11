"use client"

import type React from "react"
import { useState } from "react"
import { Star, Flame, Search } from "lucide-react"
import Button from "../common/Button"
import { useCommunity } from "@/src/contexts/CommunityContext"

const ApprovedCommunitiesTab: React.FC = () => {
  const { communities, updateBadges } = useCommunity()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCommunities = communities.filter(
    (community) =>
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleBadge = (communityId: string, badge: "starred" | "on_fire") => {
    const community = communities.find((c) => c.id === communityId)
    if (!community) return

    const hasBadge = community.badges.includes(badge)
    const updatedBadges = hasBadge ? community.badges.filter((b) => b !== badge) : [...community.badges, badge]

    updateBadges(communityId, updatedBadges)
  }

  return (
    <div>
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search communities..."
            className="brutal-input w-full pl-10"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-foreground" />
          </div>
        </div>
      </div>

      {filteredCommunities.length === 0 ? (
        <div className="text-center py-12 brutal-border bg-white">
          <p className="text-xl font-bold text-foreground">No communities found matching your search.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="brutal-border overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-secondary">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-bold text-foreground uppercase tracking-wider brutal-border border-t-0 border-l-0 border-r-0"
                  >
                    Community
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-bold text-foreground uppercase tracking-wider brutal-border border-t-0 border-l-0 border-r-0"
                  >
                    Platforms
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-bold text-foreground uppercase tracking-wider brutal-border border-t-0 border-l-0 border-r-0"
                  >
                    Clicks
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-bold text-foreground uppercase tracking-wider brutal-border border-t-0 border-l-0 border-r-0"
                  >
                    Badges
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-bold text-foreground uppercase tracking-wider brutal-border border-t-0 border-l-0 border-r-0"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y-3 divide-black">
                {filteredCommunities.map((community) => (
                  <tr key={community.id}>
                    <td className="px-6 py-4 whitespace-nowrap brutal-border border-t-0 border-l-0 border-b-0">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0 brutal-border overflow-hidden">
                          <img
                            className="h-full w-full object-cover"
                            src={community.imageUrl || "/placeholder.svg"}
                            alt={community.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-lg font-bold text-foreground">{community.name}</div>
                          <div className="text-foreground truncate max-w-xs">
                            {community.description.substring(0, 50)}
                            {community.description.length > 50 && "..."}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap brutal-border border-t-0 border-l-0 border-b-0">
                      <div className="flex flex-wrap gap-1">
                        {community.platforms.map((platform) => (
                          <span key={platform} className="brutal-badge bg-accent text-foreground">
                            {platform.charAt(0).toUpperCase() + platform.slice(1)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-foreground brutal-border border-t-0 border-l-0 border-b-0">
                      {community.clickCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap brutal-border border-t-0 border-l-0 border-b-0">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant={community.badges.includes("starred") ? "secondary" : "outline"}
                          leftIcon={<Star size={16} />}
                          onClick={() => toggleBadge(community.id, "starred")}
                        >
                          Starred
                        </Button>
                        <Button
                          size="sm"
                          variant={community.badges.includes("on_fire") ? "primary" : "outline"}
                          leftIcon={<Flame size={16} />}
                          onClick={() => toggleBadge(community.id, "on_fire")}
                        >
                          On Fire
                        </Button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap brutal-border border-t-0 border-l-0 border-b-0">
                      <a
                        href={`/community/${community.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="brutal-border bg-white px-3 py-1 text-primary hover:bg-secondary hover:text-foreground transition-colors inline-block"
                      >
                        View Profile
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default ApprovedCommunitiesTab
