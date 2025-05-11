"use client"

import { useAuth } from "@/contexts/AuthContext"
import AdminDashboard from "@/components/admin/AdminDashboard"
import { redirect } from "next/navigation"

export default function Admin() {
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
