"use client"

import type React from "react"

import { AuthProvider } from "@/contexts/AuthContext"
import { CommunityProvider } from "@/src/contexts/CommunityContext"
import { useState, useEffect } from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <AuthProvider>
      <CommunityProvider>{children}</CommunityProvider>
    </AuthProvider>
  )
}
