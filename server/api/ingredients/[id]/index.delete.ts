// delete an ingredient endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id from the request url
    const ingredientId = Number(getRouterParam(event, "id"));

    // delete ingredient
    const deletedIngredient: Ingredient = await prisma.ingredient.delete({
      where: {
        id: ingredientId,
      },
    });

    // return the deleted ingredient
    return sendJsonResponse<Ingredient>(deletedIngredient, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
