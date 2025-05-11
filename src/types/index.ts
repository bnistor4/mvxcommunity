export type Platform = "telegram" | "discord" | "x" | "other"

export interface Community {
  id: string
  name: string
  description: string
  platforms: Platform[]
  inviteLinks: Record<Platform, string>
  imageUrl: string
  submitterEmail: string
  status: "pending" | "approved" | "rejected"
  badges: ("starred" | "on_fire")[]
  clickCount: number
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  role: "admin"
}
