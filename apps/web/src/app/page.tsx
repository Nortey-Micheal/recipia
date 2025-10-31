"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { ChefHat, Search, Filter } from "lucide-react"
import RecipeGrid from "@/components/recipe-grid"
import CategoryFilter from "@/components/category-filter"
import Pagination from "@/components/pagination"
// import { recipes } from "@/lib/mock-data"
import { defineQuery } from "next-sanity"
// import { sanityFetch } from "../sanity/live"
import { Recipe } from "../sanity/types"

const EVENTS_QUERY = defineQuery(`*[
  _type == "recipe"
]|order(date asc)`);

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null)
  const [selectedMealType, setSelectedMealType] = useState<string | null>(null)
  const [recipes, setRecipes] = useState<Recipe[]>([]) // Initialize with empty array instead of undefined
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const ITEMS_PER_PAGE = 9
  const [isLoading,setIsLoading] = useState<boolean>(true)

  const fetchRecipes = async (page: number = 1) => {
    try {
      setIsLoading(true)
      const res = await fetch(`/api/getRecipes?page=${page}&limit=${ITEMS_PER_PAGE}`);
      const data = await res.json();
      // API returns { data: Recipe[], pagination: { ... } }
      setRecipes(Array.isArray(data.data.data) ? data.data.data : []); // Ensure we always set an array
      setTotalPages(data.pagination?.totalPages ?? 1);
      console.log(data.data)
      setIsLoading(false)
    } catch (error) {
      console.error("Failed to load recipes:", error);
      setIsLoading(false)
    }
  }
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCuisine, selectedMealType])

  // Fetch recipes when page changes
  useEffect(() => {
    fetchRecipes(currentPage)
  }, [currentPage])

  const cuisines = useMemo(() => {
    return Array.from(new Set(recipes.map((r) => r.cuisine || '').filter(Boolean)))
  }, [recipes])

  const mealTypes = useMemo(() => {
    return Array.from(new Set(recipes.map((r) => r.meal_type || '').filter(Boolean)))
  }, [recipes])

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch =
        (recipe.recipeTitle || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (recipe.description || '').toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCuisine = !selectedCuisine || recipe.cuisine === selectedCuisine
      const matchesMealType = !selectedMealType || recipe.meal_type === selectedMealType
      return matchesSearch && matchesCuisine && matchesMealType
    })
  }, [recipes, searchQuery, selectedCuisine, selectedMealType])

  return (
    <main className=" bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="py-6">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-linear-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                RecipeHub
              </h1>
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href="/favorites"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Favorites
              </Link>
              <Link href="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                About
              </Link>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search recipes?..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className=" max-w-[1300px] overflow-hidden mx-auto py-12">
        {/* Filters */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Filter Recipes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CategoryFilter
              label="Cuisine"
              options={cuisines!}
              selected={selectedCuisine}
              onChange={setSelectedCuisine}
            />
            <CategoryFilter
              label="Meal Type"
              options={mealTypes!}
              selected={selectedMealType}
              onChange={setSelectedMealType}
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredRecipes?.length}</span> recipes
          </p>
        </div>

        {/* Recipe Grid */}
        <div className=" mx-auto ">
          {
            isLoading ? (
              <div>Loading</div>
            ) : filteredRecipes?.length! > 0 ? (
              <>
                <RecipeGrid recipes={filteredRecipes!} />
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => {
                      setCurrentPage(page)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  />
                </div>
              </>
            ) : filteredRecipes?.length! === 0 && !isLoading ? (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-4">No recipes found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCuisine(null)
                    setSelectedMealType(null)
                    setCurrentPage(1)
                  }}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : null
          }
        </div>
      </div>
    </main>
  )
}
