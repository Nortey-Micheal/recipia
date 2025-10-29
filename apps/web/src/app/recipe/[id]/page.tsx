"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, Users, ChefHat, Heart } from "lucide-react"
import { mockRecipes } from "@/lib/mock-data"

export default function RecipePage({ params }: { params: Promise<{ id: string }> }) {
  const [recipe,setRecipe] = useState<any>(null)
  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    (
      async () => {
        const param = await params
        const recipe = mockRecipes.find((r) => r._id === param.id)
        setRecipe(recipe)
      }
    )()
  },[])

  if (!recipe) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Recipe Not Found</h1>
          <Link href="/" className="text-primary hover:underline">
            Back to Recipes
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Recipes</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Image */}
        <div className="relative w-full h-96 rounded-xl overflow-hidden mb-8 border border-border">
          <img
            src={`/.jpg?height=400&width=800&query=${recipe.recipeTitle}`}
            alt={recipe.recipeTitle}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
        </div>

        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{recipe.recipeTitle}</h1>
              <p className="text-lg text-muted-foreground">{recipe.description}</p>
            </div>
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className={`p-3 rounded-lg transition-all ${
                isFavorited
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              <Heart className={`w-6 h-6 ${isFavorited ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Meta Tags */}
          <div className="flex flex-wrap gap-3">
            {recipe.cuisine && (
              <span className="px-3 py-1 bg-accent/20 text-accent-foreground rounded-full text-sm font-medium">
                {recipe.cuisine}
              </span>
            )}
            {recipe.meal_type && (
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                {recipe.meal_type}
              </span>
            )}
            {recipe.difficulty_level && (
              <span className="px-3 py-1 bg-secondary text-foreground rounded-full text-sm font-medium">
                {recipe.difficulty_level}
              </span>
            )}
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 p-6 bg-card border border-border rounded-xl">
          {recipe.prep_time && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Prep Time</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{recipe.prep_time}m</p>
            </div>
          )}
          {recipe.cook_time && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ChefHat className="w-5 h-5 text-accent" />
                <span className="text-sm text-muted-foreground">Cook Time</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{recipe.cook_time}m</p>
            </div>
          )}
          {recipe.total_time && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Total Time</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{recipe.total_time}m</p>
            </div>
          )}
          {recipe.servings && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Servings</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{recipe.servings}</p>
            </div>
          )}
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="md:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">Ingredients</h2>
              <ul className="space-y-3">
                {recipe.ingredients?.map((ingredient:string[], index:number) => (
                  <li key={index} className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-border cursor-pointer" />
                    <span className="text-foreground">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructions */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-foreground mb-6">Instructions</h2>
            <div className="space-y-6">
              {recipe.instructions?.map((instruction:string[], index:number) => (
                <div key={index} className="flex gap-4">
                  <div className="shrink-0">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <div className="grow">
                    <p className="text-foreground leading-relaxed">{instruction}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
