import type React from "react"
import { Inter } from "next/font/google"
import { Providers } from "./providers"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import "./globals.css"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "mvx.community - MultiversX Community Aggregator",
  description: "Discover and join MultiversX communities",
  generator: 'bnistor4'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Providers>
          <Header />
          <main className="flex-grow pt-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
