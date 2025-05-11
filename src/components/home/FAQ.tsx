"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQItem {
  question: string
  answer: React.ReactNode
}

const faqItems: FAQItem[] = [
  {
    question: "What is exactly?",
    answer: (
      <>
        <p className="mb-2">
          It is a <strong>community aggregator</strong> where any founder can list his community easily.
        </p>
        <p className="mb-2">On the homepage there will be a list that users can browse, filter and click to join.</p>
        <p>
          Every community will also have a custom page with all the referral links, description, some pictures and more.
        </p>
      </>
    ),
  },
  {
    question: "What's included?",
    answer: (
      <>
        <p className="mb-2">Each community listing includes:</p>
        <ul className="list-disc list-inside mb-2">
          <li>Community name and description</li>
          <li>Official invite links to all platforms</li>
          <li>Custom profile page</li>
          <li>Visibility in the community directory</li>
        </ul>
        <p>
          Admin-approved communities may also receive special badges like "Starred" or "On Fire" based on quality and
          popularity.
        </p>
      </>
    ),
  },
  {
    question: "What kind of community can join?",
    answer: (
      <>
        <p className="mb-2">
          No matter where you are—Telegram, Discord, or X—every community is invited to join the conversation.
        </p>
        <p>We're excited to help communities thrive and grow together!</p>
      </>
    ),
  },
  {
    question: "How people will discover about mvx.community?",
    answer: (
      <>
        <p className="mb-2">
          We leverage multiple platforms like Telegram, Discord, and X to ensure maximum visibility for listed
          communities.
        </p>
        <p className="mb-2">Each new approved community gets automatically promoted through our social channels.</p>
        <p>We also run various campaigns and challenges to increase visibility and engagement with the platform.</p>
      </>
    ),
  },
]

const FAQ: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(0)

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index)
  }

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black mb-3">FAQ</h2>
          <p className="text-xl">some questions and some answers</p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleItem(index)}
                className={`flex w-full justify-between items-start text-left brutal-border p-4 ${
                  openItem === index ? "bg-primary-foreground shadow-brutal" : "bg-white shadow-brutal-sm hover:shadow-brutal"
                }`}
              >
                <h3 className="text-lg font-bold text-foreground">{item.question}</h3>
                <span className="ml-6 flex-shrink-0">
                  {openItem === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </span>
              </button>
              {openItem === index && (
                <div className="brutal-border border-t-0 p-6 bg-white">
                  <div className="text-foreground">{item.answer}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQ
