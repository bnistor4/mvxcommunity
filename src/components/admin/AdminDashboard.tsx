"use client"

import type React from "react"
import { useState } from "react"
// import { Bell } from "lucide-react" // Removed unused import
import { useCommunity } from "@/src/contexts/CommunityContext"
import ApprovedCommunitiesTab from "./ApprovedCommunitiesTab"
import PendingCommunitiesTab from "./PendingCommunitiesTab"
import { ShieldCheck, Clock } from "lucide-react"

const AdminDashboard: React.FC = () => {
  const { pendingCommunities, communities } = useCommunity()
  const [activeTab, setActiveTab] = useState("pending")

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <div className="inline-block brutal-border bg-primary text-black font-bold px-6 py-3 mb-4 rotate-1">
          <ShieldCheck size={24} className="inline-block mr-2" />
          Admin Panel
        </div>
        <h1 className="text-3xl font-black text-foreground">Dashboard</h1>
        <p className="text-xl mt-2">Manage community listings and moderate content</p>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => setActiveTab("pending")}
          className={`brutal-border px-6 py-3 text-lg font-bold transition-all ${
            activeTab === "pending"
              ? "bg-secondary text-foreground shadow-brutal"
              : "bg-white text-foreground shadow-brutal-sm hover:shadow-brutal"
          }`}
        >
          <Clock size={20} className="inline-block mr-2" />
          Pending Communities
          {pendingCommunities.length > 0 && (
            <span className="ml-2 inline-flex items-center justify-center h-6 w-6 brutal-border bg-white text-foreground text-xs">
              {pendingCommunities.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("approved")}
          className={`brutal-border px-6 py-3 text-lg font-bold transition-all ${
            activeTab === "approved"
              ? "bg-secondary text-foreground shadow-brutal"
              : "bg-white text-foreground shadow-brutal-sm hover:shadow-brutal"
          }`}
        >
          <ShieldCheck size={20} className="inline-block mr-2" />
          Approved Communities
          <span className="ml-2 inline-flex items-center justify-center h-6 w-6 brutal-border bg-white text-foreground text-xs">
            {communities.length}
          </span>
        </button>
      </div>

      <div className="brutal-card p-8">
        {activeTab === "pending" ? <PendingCommunitiesTab /> : <ApprovedCommunitiesTab />}
      </div>

      {/* Decorative elements */}
      <div className="fixed bottom-10 left-10 w-16 h-16 bg-secondary brutal-border rotate-12 hidden lg:block"></div>
      <div className="fixed top-40 right-10 w-12 h-12 bg-accent brutal-border -rotate-6 hidden lg:block"></div>
    </div>
  )
}

export default AdminDashboard
