import { defineField, defineType } from "sanity";

export const recipeType = defineType({
    name: 'recipe',
    title: "Recipe",
    type: 'document',
    fields: [
        defineField({
            name: 'recipeTitle',
            title: 'Recipe Title',
            type: 'string',
            validation: rules => rules.required()
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'string',
            validation: rules => rules.required()
        }),
        defineField({
            name: 'ingredients',
            title: 'Ingredients',
            type: 'array',
            of: [{type: 'string'}],
            validation: rules => rules.required()
        }),
        defineField({
            name: 'servings',
            title: 'Servings',
            type: 'number',
            validation: rules => rules.required()
        }),
        defineField({
            name: 'prep_time',
            title: 'Preparation time',
            type: 'number'
        }),
        defineField({
            name: 'cook_time',
            title: 'Cooking time',
            type: 'number'
        }),
        defineField({
            name: 'total_time',
            title: 'Total time',
            type: 'number'
        }),
        defineField({
            name: 'difficulty_level',
            title: 'Difficulty level',
            type: 'string' 
        }),
        defineField({
            name: 'cuisine',
            title: 'cuisine',
            type: 'string'
        }),
        defineField({
            name: 'meal_type',
            title: 'Meal Type',
            type: 'string'
        }),
        defineField({
            name: 'instructions',
            title: 'Instructions',
            type: 'array',
            of: [{type: 'string'}],
            validation: rules => rules.required().min(2)
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image'
        })
    ]
})

