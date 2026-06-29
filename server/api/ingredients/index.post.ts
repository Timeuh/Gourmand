// ingredient creation endpoint
export default defineEventHandler(async (event) => {
  try {
    // read the request body and validate its data
    const body = await readBody<IngredientCreation>(event);
    const validatedBody = await ingredientCreateValidator.validate(body);

    // create a new ingredient in the database
    const newIngredient: Ingredient = await prisma.ingredient.create({
      data: {
        name: validatedBody.name,
      },
    });

    // return the newly created ingredient
    return sendJsonResponse<Ingredient>(newIngredient, HTTP_CREATED);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
