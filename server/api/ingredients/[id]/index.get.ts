// get ingredient by id endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id from the request parameters
    const ingredientId = Number(getRouterParam(event, "id"));

    // get ingredient from database by id
    const ingredient: Ingredient | null = await prisma.ingredient.findUnique({
      where: {
        id: ingredientId,
      },
    });

    // if ingredient is not found, return an error
    if (!ingredient) {
      return sendJsonResponse<ApiError>(
        {
          error: {
            code: HTTP_NOT_FOUND,
            message: MSG_NOT_FOUND,
            details: `Ingredient with id ${ingredientId} not found`,
          },
        },
        HTTP_NOT_FOUND,
      );
    }

    // return the ingredient
    return sendJsonResponse<Ingredient>(ingredient, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
