"use client"

import Link from "next/link"
import { Clock, Users, ChefHat } from "lucide-react"
import type { Recipe } from "@/lib/types"

interface RecipeGridProps {
  recipes: Recipe[]
}

export default function RecipeGrid({ recipes }: RecipeGridProps) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
      {recipes.map((recipe, index) => {
        // Bento grid layout - vary sizes
        const isLarge = index % 5 === 0
        const isMedium = index % 5 === 1 || index % 5 === 2

        return (
          <Link
            key={recipe._id}
            href={`/recipe/${recipe._id}`}
            className={`group relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg ${
              isLarge ? "md:col-span-2 md:row-span-2" : isMedium ? "md:row-span-2" : ""
            }`}
          >
            {/* Image Container */}
            <div className="relative w-full h-48 md:h-64 lg:h-80 bg-linear-to-br from-secondary to-muted overflow-hidden">
              <img
                src={recipe.imageUrl || `/generic-placeholder-icon.png?height=${isLarge ? 400 : 300}&width=${isLarge ? 400 : 300}&query=${recipe.recipeTitle}`}
                alt={recipe.recipeTitle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

              {/* Badge */}
              <div className="absolute top-4 right-4">
                <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  {recipe.difficulty_level}
                </span>
              </div>

              {/* Cuisine Tag */}
              {recipe.cuisine && (
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-accent/90 text-accent-foreground text-xs font-medium rounded-full">
                    {recipe.cuisine}
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {recipe.recipeTitle}
              </h3>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{recipe.description}</p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-xs md:text-sm text-muted-foreground">
                {recipe.prep_time && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{recipe.prep_time}m prep</span>
                  </div>
                )}
                {recipe.cook_time && (
                  <div className="flex items-center gap-1">
                    <ChefHat className="w-4 h-4 text-accent" />
                    <span>{recipe.cook_time}m cook</span>
                  </div>
                )}
                {recipe.servings && (
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{recipe.servings} servings</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
