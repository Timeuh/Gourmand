// ingredient linking to food endpoint
export default defineEventHandler(async (event) => {
  try {
    // get ids from the request parameters
    const foodId = Number(getRouterParam(event, "id"));
    const ingredientId = Number(getRouterParam(event, "ingredientId"));

    // link an ingredient to a food in the database
    const newLink: FoodIngredientLink = await prisma.food_Ingredient.create({
      data: {
        food_id: foodId,
        ingredient_id: ingredientId,
      },
    });

    // return the newly created link
    return sendJsonResponse<FoodIngredientLink>(newLink, HTTP_CREATED);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
