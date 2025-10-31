"use client"

import Link from "next/link"
import { ArrowLeft, Heart } from "lucide-react"

export default function FavoritesPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Recipes</span>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-primary fill-current" />
          <h1 className="text-4xl font-bold text-foreground">Your Favorites</h1>
        </div>

        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground mb-4">You haven't added any favorite recipes yet.</p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Explore Recipes
          </Link>
        </div>
      </div>
    </main>
  )
}
