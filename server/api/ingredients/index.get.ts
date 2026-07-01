// get all ingredients endpoint
export default defineEventHandler(async () => {
  try {
    // get ingredients from database
    const ingredients: Ingredient[] = await prisma.ingredient.findMany();

    // return the ingredients collection
    return sendCollectionResponse<Ingredient>(ingredients);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
