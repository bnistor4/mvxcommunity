"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../contexts/AuthContext"
import AdminDashboard from "../components/admin/AdminDashboard"
import { useEffect } from "react"

const Admin: React.FC = () => {
  const { user, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user || !isAdmin) {
      router.push("/login")
    }
  }, [user, isAdmin, router])

  if (!user || !isAdmin) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <AdminDashboard />
    </div>
  )
}

export default Admin
