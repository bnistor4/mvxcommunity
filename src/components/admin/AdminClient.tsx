"use client"

import { useAuth } from "@/src/contexts/AuthContext"
import AdminDashboard from "./AdminDashboard"
import { redirect } from "next/navigation"

export default function AdminClient() {
  const { user, isAdmin } = useAuth()

  if (!user || !isAdmin) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <AdminDashboard />
    </div>
  )
} 