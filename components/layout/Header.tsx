"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import Button from "../common/Button"
import { useAuth } from "../../contexts/AuthContext"
import { motion } from "framer-motion"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout, isAdmin } = useAuth()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-brutal-sm py-4 px-4" : "bg-neobrutalist-background shadow-brutal-sm py-4 px-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <motion.span
            className="text-xl font-bold text-foreground"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            mvx<span className="text-primary">.community</span>
          </motion.span>
          <span className="text-xs text-foreground italic whitespace-nowrap hidden sm:inline-block font-handwriting">
            from users to members
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`text-sm font-bold hover:text-primary transition-colors ${
              pathname === "/" ? "text-primary" : "text-foreground"
            }`}
          >
            <motion.span whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              Home
            </motion.span>
          </Link>
          <Link
            href="/submit"
            className={`text-sm font-bold hover:text-primary transition-colors ${
              pathname === "/submit" ? "text-primary" : "text-foreground"
            }`}
          >
            <motion.span whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              Submit Community
            </motion.span>
          </Link>
          {isAdmin ? (
            <Link
              href="/admin"
              className={`text-sm font-bold hover:text-primary transition-colors ${
                pathname?.startsWith("/admin") ? "text-primary" : "text-foreground"
              }`}
            >
              <motion.span whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                Admin Panel
              </motion.span>
            </Link>
          ) : (
            <Link
              href="/login"
              className={`text-sm font-bold hover:text-primary transition-colors ${
                pathname === "/login" ? "text-primary" : "text-foreground"
              }`}
            >
              <motion.span whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                Admin Login
              </motion.span>
            </Link>
          )}
          {user && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </motion.div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={toggleMobileMenu}
          className="md:hidden text-foreground hover:text-primary transition-colors focus:outline-none brutal-border p-1"
          aria-label="Toggle mobile menu"
          whileTap={{ scale: 0.9 }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden bg-background brutal-border mt-2 mx-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="/"
              className={`text-base font-bold hover:text-primary transition-colors ${
                pathname === "/" ? "text-primary" : "text-foreground"
              }`}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              href="/submit"
              className={`text-base font-bold hover:text-primary transition-colors ${
                pathname === "/submit" ? "text-primary" : "text-foreground"
              }`}
              onClick={closeMobileMenu}
            >
              Submit Community
            </Link>
            {isAdmin ? (
              <Link
                href="/admin"
                className={`text-base font-bold hover:text-primary transition-colors ${
                  pathname?.startsWith("/admin") ? "text-primary" : "text-foreground"
                }`}
                onClick={closeMobileMenu}
              >
                Admin Panel
              </Link>
            ) : (
              <Link
                href="/login"
                className={`text-base font-bold hover:text-primary transition-colors ${
                  pathname === "/login" ? "text-primary" : "text-foreground"
                }`}
                onClick={closeMobileMenu}
              >
                Admin Login
              </Link>
            )}
            {user && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  logout()
                  closeMobileMenu()
                }}
              >
                Logout
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </header>
  )
}
