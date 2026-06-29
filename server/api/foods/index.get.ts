// get all foods endpoint
export default defineEventHandler(async () => {
  try {
    // get foods from database
    const foods: Food[] = await prisma.food.findMany();

    // return the foods collection
    return sendCollectionResponse<Food>(foods);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
