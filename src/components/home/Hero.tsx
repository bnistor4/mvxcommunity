import type React from "react"
import Link from "next/link"
import Button from "../common/Button"
import { Rocket, Search } from "lucide-react"

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden pt-48 pb-32 min-h-96 text-black custom-hero-gradient">
      <div className="custom-hero-gradient-absolute"></div>
      <div className="container max-w-4xl relative z-10">
        <div className="text-center mb-10">
          <div className="inline-block brutal-border bg-secondary text-white font-bold px-4 py-2 mb-6 rotate-2 animate-pulse">
            first 10 spots for free
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Grow your MultiversX <span className="text-primary">Community</span> in seconds
          </h1>

          <p className="text-xl">
            An amazing place where users <span className="font-bold">discover communities</span> and become{" "}
            <span className="font-bold">members</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10 mb-16">
          <a href="#communities">
            <Button size="lg" className="w-full sm:w-auto rotate-1 text-white">
              <Search className="mr-2 h-5 w-5" />
              Find a Community
            </Button>
          </a>
          <Link href="/submit">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto -rotate-1 text-white">
              <Rocket className="mr-2 h-5 w-5" />
              List your Community
            </Button>
          </Link>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-2 -right-6 w-24 h-24 bg-neobrutalist-accent brutal-border rotate-12 hidden md:block"></div>
      <div className="absolute top-20 -right-6 w-16 h-16 bg-accent brutal-border -rotate-6 hidden md:block"></div>
    </div>
  )
}

export default Hero
