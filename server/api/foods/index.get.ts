// get all foods endpoint
export default defineEventHandler(async (event) => {
  try {
    // get fullContent param from the request parameters
    const fullContent = getQuery(event).fullContent === "true";

    // get foods from database
    const foods: Food[] | FullFood[] = await prisma.food.findMany({
      include: fullContent
        ? {
            plate: true,
            preptime: true,
            foodIngredients: {
              include: {
                food_id: false,
                ingredient_id: false,
                ingredient: true,
              },
            },
          }
        : undefined,
    });

    // return the foods collection
    return sendCollectionResponse<Food | FullFood>(foods);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
