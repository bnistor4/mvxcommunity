"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/src/contexts/AuthContext"
import AdminDashboard from "./AdminDashboard"
import { redirect, usePathname } from "next/navigation"

export default function AdminClient() {
  const { user, isAdmin } = useAuth()
  const routerPathname = usePathname() // To prevent redirect loops if already on login
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (user === undefined) { // Still loading auth state
      return;
    }
    if (!user || !isAdmin) {
      if (routerPathname !== "/login") {
        redirect("/login")
      }
    } else {
      setIsCheckingAuth(false);
    }
  }, [user, isAdmin, routerPathname])

  if (isCheckingAuth || !user || !isAdmin) {
    // Render nothing or a loader while checking auth or if redirecting
    // This prevents rendering AdminDashboard prematurely during SSR/prerender if auth fails
    return null 
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <AdminDashboard />
    </div>
  )
} 