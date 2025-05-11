"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import CommunityCard from "./CommunityCard";
import { Platform } from "../../types";
import { useCommunity } from "@/src/contexts/CommunityContext";

const CommunityList: React.FC = () => {
  const {
    filteredCommunities,
    filterByPlatform,
    filterBySearch,
    activeFilters,
  } = useCommunity();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterBySearch(query);
  };

  const handleFilterClick = (platform: Platform | "") => {
    filterByPlatform(platform);
  };

  return (
    <div id="communities" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Explore Communities</h2>
          <p className="text-xl">
            Discover active MultiversX communities and connect with like-minded
            individuals
          </p>
        </div>

        <div className="mb-10">
          <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search communities..."
                className="brutal-input w-full pl-10 pr-3 py-3"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-foreground" />
              </div>
            </div>

            <div className="flex brutal-border">
              <div className="p-3 bg-white border-r-3 border-black">
                <Filter size={20} className="text-foreground" />
              </div>
              <div className="flex divide-x-3 divide-black">
                <button
                  onClick={() => handleFilterClick("")}
                  className={`px-4 py-2 text-sm font-bold ${
                    activeFilters.platform === ""
                      ? "bg-secondary text-foreground"
                      : "bg-white text-foreground hover:bg-muted"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => handleFilterClick("telegram")}
                  className={`px-4 py-2 text-sm font-bold ${
                    activeFilters.platform === "telegram"
                      ? "bg-secondary text-foreground"
                      : "bg-white text-foreground hover:bg-muted"
                  }`}
                >
                  Telegram
                </button>
                <button
                  onClick={() => handleFilterClick("discord")}
                  className={`px-4 py-2 text-sm font-bold ${
                    activeFilters.platform === "discord"
                      ? "bg-secondary text-foreground"
                      : "bg-white text-foreground hover:bg-muted"
                  }`}
                >
                  Discord
                </button>
                <button
                  onClick={() => handleFilterClick("x")}
                  className={`px-4 py-2 text-sm font-bold ${
                    activeFilters.platform === "x"
                      ? "bg-secondary text-foreground"
                      : "bg-white text-foreground hover:bg-muted"
                  }`}
                >
                  X
                </button>
              </div>
            </div>
          </div>
        </div>

        {filteredCommunities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCommunities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 brutal-border bg-white shadow-brutal">
            <h3 className="text-2xl font-bold text-foreground mb-3">
              No communities found
            </h3>
            <p className="text-foreground text-lg">
              Try adjusting your filters or search query, or{" "}
              <a
                href="/submit"
                className="text-primary font-bold hover:underline"
              >
                submit your own community
              </a>
              !
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityList;
