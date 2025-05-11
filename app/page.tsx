"use client"

import Hero from "../src/components/home/Hero"
import HowItWorks from "../src/components/home/HowItWorks"
import CommunityList from "../src/components/home/CommunityList"
import FAQ from "../src/components/home/FAQ"

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <CommunityList />
      <FAQ />
    </>
  )
}
