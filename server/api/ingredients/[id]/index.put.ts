// update a ingredient endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id from the request parameters
    const ingredientId = Number(getRouterParam(event, "id"));

    // read the request body and validate its data
    const body = await readBody<IngredientUpdate>(event);
    const validatedBody: IngredientUpdate =
      await ingredientUpdateValidator.validate(body);

    // update ingredient data
    const updatedIngredient: Ingredient = await prisma.ingredient.update({
      where: {
        id: ingredientId,
      },
      data: validatedBody,
    });

    // return the updated ingredient
    return sendJsonResponse<Ingredient>(updatedIngredient, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
