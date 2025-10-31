export type Recipe = {
  _id: string
  _type: "recipe"
  _createdAt: string
  _updatedAt: string
  _rev: string
  recipeTitle?: string
  description?: string
  ingredients?: Array<string>
  servings?: number
  prep_time?: number
  cook_time?: number
  total_time?: number
  difficulty_level?: string
  cuisine?: string
  meal_type?: string
  instructions?: Array<string>
  image?: {
    asset?: {
      _ref: string
      _type: "reference"
      _weak?: boolean
    }
    media?: unknown
    _type: "image"
  }
  imageUrl?: string
}
