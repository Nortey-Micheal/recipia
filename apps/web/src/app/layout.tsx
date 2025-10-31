import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { SanityLive } from "../sanity/live"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RecipeHub - Discover Culinary Delights",
  description: "Explore curated recipes from around the world",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="">
      <body className={` font-sans antialiase`}>
        <div className="mx-5">
          {children}
        </div>
        <SanityLive />
      </body>
    </html>
  )
}
