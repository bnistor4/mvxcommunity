import type React from "react"

interface BadgeProps {
  variant?: "default" | "starred" | "onFire" | "platform"
  children: React.ReactNode
  className?: string
}

const Badge: React.FC<BadgeProps> = ({ variant = "default", children, className = "" }) => {
  const variants = {
    default: "bg-white text-foreground",
    starred: "bg-secondary text-white",
    onFire: "bg-primary text-white",
    platform: "bg-accent text-foreground",
  }

  return (
    <span className={`brutal-badge ${variants[variant]} ${className}`}>
      {variant === "starred" && <span className="mr-1">⭐</span>}
      {variant === "onFire" && <span className="mr-1">🔥</span>}
      {children}
    </span>
  )
}

export default Badge
