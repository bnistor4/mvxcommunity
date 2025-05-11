"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Check } from "lucide-react"
import Button from "../common/Button"
import { useCommunity } from "@/src/contexts/CommunityContext"
import type { Platform } from "@/src/types"
import { motion, AnimatePresence } from "framer-motion"
import { triggerFireworks } from "@/utils/confetti"

const CommunityForm: React.FC = () => {
  const { addCommunity } = useCommunity()
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    platforms: [] as Platform[],
    imageUrl: "",
    submitterEmail: "",
    inviteLinks: {
      telegram: "",
      discord: "",
      x: "",
      other: "",
    },
  })

  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formState.name.trim()) {
      newErrors.name = "Community name is required"
    }

    if (!formState.description.trim()) {
      newErrors.description = "Description is required"
    } else if (formState.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters"
    }

    if (formState.platforms.length === 0) {
      newErrors.platforms = "At least one platform is required"
    }

    let hasValidLink = false
    formState.platforms.forEach((platform) => {
      if (!formState.inviteLinks[platform]) {
        newErrors[`link_${platform}`] = `${platform} invite link is required`
      } else {
        hasValidLink = true
      }
    })

    if (!hasValidLink) {
      newErrors.inviteLinks = "At least one valid invite link is required"
    }

    if (!formState.imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required"
    }

    if (!formState.submitterEmail.trim()) {
      newErrors.submitterEmail = "Contact email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formState.submitterEmail)) {
      newErrors.submitterEmail = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      addCommunity(formState)
      setShowSuccess(true)
      // Trigger confetti effect
      triggerFireworks()

      // Reset form
      setFormState({
        name: "",
        description: "",
        platforms: [] as Platform[],
        imageUrl: "",
        submitterEmail: "",
        inviteLinks: {
          telegram: "",
          discord: "",
          x: "",
          other: "",
        },
      })
      setErrors({})

      // Hide success message after a delay
      setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
    }
  }

  const handlePlatformToggle = (platform: Platform) => {
    setFormState((prev) => {
      const exists = prev.platforms.includes(platform)
      const updatedPlatforms = exists ? prev.platforms.filter((p) => p !== platform) : [...prev.platforms, platform]

      return {
        ...prev,
        platforms: updatedPlatforms,
      }
    })
  }

  return (
    <div className="max-w-3xl mx-auto">
      <AnimatePresence>
        {showSuccess ? (
          <motion.div
            className="brutal-card p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-center mb-6">
              <motion.div
                className="h-16 w-16 bg-secondary brutal-border flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <Check className="h-8 w-8 text-foreground" />
              </motion.div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Thank you for your submission!</h3>
            <p className="text-foreground text-lg mb-6">
              Your community is now pending approval. We'll review it shortly.
            </p>
            <Button onClick={() => setShowSuccess(false)} variant="secondary">
              Submit Another Community
            </Button>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="brutal-card p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg font-bold text-foreground mb-2">
                  Community Name*
                </label>
                <motion.input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                  className="brutal-input w-full"
                  placeholder="e.g., MultiversX Developers"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                {errors.name && <p className="mt-2 text-sm text-destructive font-bold">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="description" className="block text-lg font-bold text-foreground mb-2">
                  Description*
                </label>
                <motion.textarea
                  id="description"
                  value={formState.description}
                  onChange={(e) => setFormState((prev) => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="brutal-input w-full"
                  placeholder="Tell us about your community and what makes it special..."
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                {errors.description && <p className="mt-2 text-sm text-destructive font-bold">{errors.description}</p>}
              </div>

              <div>
                <span className="block text-lg font-bold text-foreground mb-3">Platforms*</span>
                <div className="flex flex-wrap gap-3">
                  {(["telegram", "discord", "x", "other"] as Platform[]).map((platform) => (
                    <motion.button
                      key={platform}
                      type="button"
                      onClick={() => handlePlatformToggle(platform)}
                      className={`inline-flex items-center px-4 py-2 brutal-border text-sm font-bold transition-all
                        ${
                          formState.platforms.includes(platform)
                            ? "bg-secondary text-foreground shadow-brutal"
                            : "bg-white text-foreground shadow-brutal-sm hover:shadow-brutal"
                        }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {formState.platforms.includes(platform) ? (
                        <Check className="mr-2 h-4 w-4" />
                      ) : (
                        <Plus className="mr-2 h-4 w-4" />
                      )}
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </motion.button>
                  ))}
                </div>
                {errors.platforms && <p className="mt-2 text-sm text-destructive font-bold">{errors.platforms}</p>}
              </div>

              <div className="space-y-4">
                <span className="block text-lg font-bold text-foreground">Invite Links*</span>
                {formState.platforms.map((platform) => (
                  <motion.div
                    key={platform}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label htmlFor={`link_${platform}`} className="block text-sm font-bold text-foreground mb-2">
                      {platform.charAt(0).toUpperCase() + platform.slice(1)} Invite Link
                    </label>
                    <motion.input
                      type="url"
                      id={`link_${platform}`}
                      value={formState.inviteLinks[platform]}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          inviteLinks: {
                            ...prev.inviteLinks,
                            [platform]: e.target.value,
                          },
                        }))
                      }
                      className="brutal-input w-full"
                      placeholder={`e.g., https://${platform === "telegram" ? "t.me" : platform === "discord" ? "discord.gg" : "x.com"}/yourcommunity`}
                      whileFocus={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    {errors[`link_${platform}`] && (
                      <p className="mt-2 text-sm text-destructive font-bold">{errors[`link_${platform}`]}</p>
                    )}
                  </motion.div>
                ))}
                {errors.inviteLinks && <p className="mt-2 text-sm text-destructive font-bold">{errors.inviteLinks}</p>}
              </div>

              <div>
                <label htmlFor="imageUrl" className="block text-lg font-bold text-foreground mb-2">
                  Community Image URL*
                </label>
                <motion.input
                  type="url"
                  id="imageUrl"
                  value={formState.imageUrl}
                  onChange={(e) => setFormState((prev) => ({ ...prev, imageUrl: e.target.value }))}
                  className="brutal-input w-full"
                  placeholder="e.g., https://example.com/image.jpg"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <p className="mt-1 text-sm text-foreground">
                  Use a URL to an image that represents your community (logo, banner, etc.)
                </p>
                {errors.imageUrl && <p className="mt-2 text-sm text-destructive font-bold">{errors.imageUrl}</p>}
              </div>

              <div>
                <label htmlFor="submitterEmail" className="block text-lg font-bold text-foreground mb-2">
                  Contact Email*
                </label>
                <motion.input
                  type="email"
                  id="submitterEmail"
                  value={formState.submitterEmail}
                  onChange={(e) => setFormState((prev) => ({ ...prev, submitterEmail: e.target.value }))}
                  className="brutal-input w-full"
                  placeholder="e.g., you@example.com"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <p className="mt-1 text-sm text-foreground">
                  Your email will not be displayed publicly and will only be used for communication regarding your
                  listing.
                </p>
                {errors.submitterEmail && (
                  <p className="mt-2 text-sm text-destructive font-bold">{errors.submitterEmail}</p>
                )}
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" size="lg" className="rotate-1">
                  Submit Community
                </Button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CommunityForm
