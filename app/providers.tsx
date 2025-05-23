"use client"

import type React from "react"

import { AuthProvider } from "@/src/contexts/AuthContext"
import { CommunityProvider } from "@/src/contexts/CommunityContext"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CommunityProvider>{children}</CommunityProvider>
    </AuthProvider>
  )
}
