import { client } from "@/src/sanity/client";
import { defineQuery } from "next-sanity";
import { NextResponse } from "next/server";

const RECIPE_BY_ID_QUERY = defineQuery(`*[_type == "recipe" && _id == $id] {
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
}[0]`);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id") || searchParams.get("recipeId");

    if (!id) {
      return NextResponse.json({ error: "Missing recipe id" }, { status: 400 });
    }

    const recipe = await client.fetch(RECIPE_BY_ID_QUERY, { id });

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json({ data: recipe });
  } catch (err) {
    console.error("getRecipeById error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const id = body?.recipeId || body?.id

    if (!id) {
      return NextResponse.json({ error: "Missing recipe id" }, { status: 400 })
    }

    const recipe = await client.fetch(RECIPE_BY_ID_QUERY, { id })

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 })
    }

    return NextResponse.json({ data: recipe })
  } catch (err) {
    console.error("getRecipeById POST error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
