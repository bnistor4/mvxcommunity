"use client"

import { createContext, useState, useContext, type ReactNode } from "react"
import { supabase } from "../lib/supabase"
import type { User } from "../src/types/index.ts"

interface AuthContextType {
  user: User | null
  login: (apiKey: string) => Promise<boolean>
  logout: () => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (apiKey: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.from("admin_keys").select().eq("api_key", apiKey).maybeSingle()

      if (error) {
        console.error("Login error:", error)
        return false
      }

      if (!data) {
        return false
      }

      setUser({
        id: data.id,
        role: "admin",
      })

      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
