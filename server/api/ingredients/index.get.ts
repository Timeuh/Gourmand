// get all ingredients endpoint
export default defineEventHandler(async (event) => {
  try {
    // get fullContent param from the request parameters
    const fullContent = getQuery(event).fullContent === "true";

    // get ingredients from database
    const ingredients: Ingredient[] | FullIngredient[] =
      await prisma.ingredient.findMany({
        include: fullContent
          ? {
              category: true,
            }
          : undefined,
      });

    // return the ingredients collection
    return sendCollectionResponse<Ingredient | FullIngredient>(ingredients);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
