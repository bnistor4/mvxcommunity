"use client";

import type React from "react";
import Link from "next/link";
import { ExternalLink, MessageCircle, Twitter } from "lucide-react";
import Button from "../common/Button";
import Badge from "../common/Badge";
import type { Community, Platform } from "../../types";
import { useCommunity } from "@/src/contexts/CommunityContext";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface CommunityCardProps {
  community: Community;
  variant?:
    | "neobrutalist"
    | "minimal"
    | "glassmorphic"
    | "skeuomorphic"
    | "flat";
}

const CommunityCard: React.FC<CommunityCardProps> = ({
  community,
  variant = "neobrutalist", // default style
}) => {
  const { incrementClickCount } = useCommunity();
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (variant === "neobrutalist") {
      setRotation(Math.floor(Math.random() * 5) - 2);
    }
  }, [variant]);

  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case "telegram":
        return <MessageCircle size={16} />;
      case "discord":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.127 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
          </svg>
        );
      case "x":
        return <Twitter size={16} />;
      default:
        return <ExternalLink size={16} />;
    }
  };

  const getPlatformName = (platform: Platform) => {
    switch (platform) {
      case "telegram":
        return "Telegram";
      case "discord":
        return "Discord";
      case "x":
        return "X (Twitter)";
      default:
        return "Other";
    }
  };

  const handleJoinClick = (platform: Platform) => {
    incrementClickCount(community.id);
    window.open(community.inviteLinks[platform], "_blank");
  };

  // Glassmorphic variant
  if (variant === "glassmorphic") {
    return (
      <div className="backdrop-blur-lg bg-white/30 rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/30 backdrop-blur-sm">
              <img
                src={community.imageUrl || "/placeholder.svg"}
                alt={community.name}
                className="w-full h-full object-cover"
              />
            </div>
            {community.badges.length > 0 && (
              <div className="absolute -top-2 -right-2 flex space-x-1">
                {community.badges.includes("starred") && (
                  <Badge
                    variant="starred"
                    className="backdrop-blur-sm bg-yellow-400/30"
                  >
                    ★
                  </Badge>
                )}
                {community.badges.includes("on_fire") && (
                  <Badge
                    variant="onFire"
                    className="backdrop-blur-sm bg-orange-400/30"
                  >
                    🔥
                  </Badge>
                )}
              </div>
            )}
          </div>

          <Link
            href={`/community/${community.id}`}
            className="hover:opacity-80 transition-opacity"
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              {community.name}
            </h3>
          </Link>

          <p className="text-white/80 mb-4 line-clamp-2">
            {community.description}
          </p>

          <div className="w-full space-y-2">
            {community.platforms.map((platform) => (
              <button
                key={platform}
                onClick={() => handleJoinClick(platform)}
                className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
              >
                {getPlatformIcon(platform)}
                <span className="ml-2">Join {getPlatformName(platform)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Skeuomorphic variant
  if (variant === "skeuomorphic") {
    return (
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-6 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] transition-all duration-300">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-xl overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] bg-white p-1">
              <img
                src={community.imageUrl || "/placeholder.svg"}
                alt={community.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            {community.badges.length > 0 && (
              <div className="absolute -top-2 -right-2 flex space-x-1">
                {community.badges.includes("starred") && (
                  <Badge
                    variant="starred"
                    className="bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-md"
                  >
                    ★
                  </Badge>
                )}
                {community.badges.includes("on_fire") && (
                  <Badge
                    variant="onFire"
                    className="bg-gradient-to-br from-orange-400 to-orange-500 shadow-md"
                  >
                    🔥
                  </Badge>
                )}
              </div>
            )}
          </div>

          <Link
            href={`/community/${community.id}`}
            className="hover:opacity-80 transition-opacity"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {community.name}
            </h3>
          </Link>

          <p className="text-gray-600 mb-4 line-clamp-2">
            {community.description}
          </p>

          <div className="w-full space-y-2">
            {community.platforms.map((platform) => (
              <button
                key={platform}
                onClick={() => handleJoinClick(platform)}
                className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-300 active:translate-y-0.5"
              >
                {getPlatformIcon(platform)}
                <span className="ml-2">Join {getPlatformName(platform)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Flat variant (minimalistic)
  if (variant === "flat") {
    return (
      <div className="bg-white rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
        <div className="flex items-start space-x-4">
          <div className="relative flex-shrink-0">
            <img
              src={community.imageUrl || "/placeholder.svg"}
              alt={community.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            {community.badges.length > 0 && (
              <div className="absolute -top-1 -right-1">
                {community.badges.includes("starred") && (
                  <span className="text-yellow-400">★</span>
                )}
                {community.badges.includes("on_fire") && (
                  <span className="text-orange-400">🔥</span>
                )}
              </div>
            )}
          </div>

          <div className="flex-grow">
            <Link
              href={`/community/${community.id}`}
              className="hover:underline"
            >
              <h3 className="text-lg font-medium text-gray-900">
                {community.name}
              </h3>
            </Link>
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">
              {community.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {community.platforms.map((platform) => (
                <button
                  key={platform}
                  onClick={() => handleJoinClick(platform)}
                  className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                >
                  {getPlatformIcon(platform)}
                  <span className="ml-1">{getPlatformName(platform)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Minimal variant
  if (variant === "minimal") {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-center space-x-4">
          <div className="relative flex-shrink-0">
            <img
              src={community.imageUrl || "/placeholder.svg"}
              alt={community.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
            />
            {community.badges.length > 0 && (
              <div className="absolute -top-1 -right-1">
                {community.badges.includes("starred") && (
                  <span className="flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-500">
                      <span className="text-[8px] text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        ★
                      </span>
                    </span>
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex-grow">
            <Link
              href={`/community/${community.id}`}
              className="hover:underline"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {community.name}
              </h3>
            </Link>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {community.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {community.platforms.map((platform) => (
                <button
                  key={platform}
                  onClick={() => handleJoinClick(platform)}
                  className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                >
                  {getPlatformIcon(platform)}
                  <span className="ml-1">{getPlatformName(platform)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Neobrutalist variant (default)
  return (
    <div
      className={cn(
        "brutal-card p-6 transform hover:translate-y-[-4px] transition-transform duration-200",
        variant === "neobrutalist" ? `rotate-[${rotation}deg]` : ""
      )}
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="w-24 h-24 brutal-border bg-white p-2 rotate-2 shadow-brutal">
            <img
              src={community.imageUrl || "/placeholder.svg"}
              alt={community.name}
              className="w-full h-full object-contain"
            />
          </div>
          {community.badges.length > 0 && (
            <div className="absolute -top-2 -right-2 flex space-x-1">
              {community.badges.includes("starred") && (
                <Badge variant="starred" className="font-handwriting">
                  ★ Star
                </Badge>
              )}
              {community.badges.includes("on_fire") && (
                <Badge variant="onFire" className="font-handwriting">
                  🔥 Hot
                </Badge>
              )}
            </div>
          )}
        </div>

        <Link
          href={`/community/${community.id}`}
          className="hover:underline mb-2"
        >
          <h3 className="text-2xl font-bold font-handwriting">
            {community.name}
          </h3>
        </Link>

        <p className="text-foreground mb-4 line-clamp-2 font-handwriting">
          {community.description}
        </p>

        <div className="w-full space-y-2">
          {community.platforms.map((platform) => (
            <Button
              key={platform}
              fullWidth
              variant={
                platform === community.platforms[0] ? "primary" : "outline"
              }
              className="brutal-btn font-handwriting text-lg"
              leftIcon={getPlatformIcon(platform)}
              onClick={() => handleJoinClick(platform)}
            >
              Join {getPlatformName(platform)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
