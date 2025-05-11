import type React from "react"
import Hero from "../components/home/Hero"
import HowItWorks from "../components/home/HowItWorks"
import CommunityList from "../components/home/CommunityList"
import FAQ from "../components/home/FAQ"

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <CommunityList />
      <FAQ />
    </div>
  )
}

export default Home
