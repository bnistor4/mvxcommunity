"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../contexts/AuthContext"
import Button from "../common/Button"
import { Lock, Key } from "lucide-react"
import { motion } from "framer-motion"

const AdminLogin: React.FC = () => {
  const [apiKey, setApiKey] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(apiKey)
      if (success) {
        router.push("/admin")
      } else {
        setError("Invalid API key. Please try again.")
      }
    } catch (err) {
      setError("An error occurred during login")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto py-16">
      <div className="text-center mb-8">
        <motion.div
          className="inline-block brutal-border bg-primary text-white font-bold px-6 py-3 mb-4 rotate-2"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Lock size={24} className="inline-block mr-2" />
          Admin Access
        </motion.div>
        <h1 className="text-3xl font-black text-foreground">Admin Login</h1>
      </div>

      <motion.div
        className="brutal-card p-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.div
              className="brutal-border border-destructive bg-white p-4 mb-6"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start">
                <svg
                  className="h-5 w-5 text-destructive mt-0.5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-destructive font-bold">{error}</p>
              </div>
            </motion.div>
          )}

          <div>
            <label htmlFor="apiKey" className="block text-lg font-bold text-foreground mb-2">
              API Key
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key size={20} className="text-foreground" />
              </div>
              <motion.input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="brutal-input w-full pl-10"
                required
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" fullWidth isLoading={isLoading} className="rotate-1">
              Login to Admin Panel
            </Button>
          </div>
        </form>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute bottom-20 left-10 w-16 h-16 bg-secondary brutal-border rotate-12 hidden md:block"></div>
      <div className="absolute top-40 right-10 w-12 h-12 bg-accent brutal-border -rotate-6 hidden md:block"></div>
    </div>
  )
}

export default AdminLogin
