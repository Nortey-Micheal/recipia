import { sanityFetch } from "@/src/sanity/live";
import { defineQuery } from "next-sanity";
import { NextResponse } from "next/server";

const RECIPES_COUNT_QUERY = defineQuery(`count(*[_type == "recipe"])`);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "9");
  const start = (page - 1) * limit;

  const query = defineQuery(`*[_type == "recipe"] {
    _id,
    recipeTitle,
    description,
    ingredients,
    servings,
    prep_time,
    cook_time,
    total_time,
    difficulty_level,
    cuisine,
    meal_type,
    instructions,
    "imageUrl": image.asset->url
  }[${start}...${start + limit}]`);

  const [recipes, totalRecipes] = await Promise.all([
    sanityFetch({ query }),
    sanityFetch({ query: RECIPES_COUNT_QUERY }),
  ]);

  return NextResponse.json({
    data: recipes,
    pagination: {
      total: Number(totalRecipes.data),
      totalPages: Math.ceil(Number(totalRecipes.data) / limit),
      currentPage: page,
      limit,
    },
  });
}
