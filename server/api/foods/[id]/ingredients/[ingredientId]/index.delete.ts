// ingredient unlinking from food endpoint
export default defineEventHandler(async (event) => {
  try {
    // get ids from the request parameters
    const foodId = Number(getRouterParam(event, "id"));
    const ingredientId = Number(getRouterParam(event, "ingredientId"));

    // unlink an ingredient from a food in the database
    const deletedLink: FoodIngredientLink = await prisma.food_Ingredient.delete(
      {
        where: {
          food_id_ingredient_id: {
            food_id: foodId,
            ingredient_id: ingredientId,
          },
        },
      },
    );

    // return the deleted link
    return sendJsonResponse<FoodIngredientLink>(deletedLink, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
