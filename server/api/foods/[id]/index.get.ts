// get food by id endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id and fullContent param from the request parameters
    const foodId = Number(getRouterParam(event, "id"));
    const fullContent = getQuery(event).fullContent === "true";

    // get food from database by id
    const food: Food | FullFood | null = await prisma.food.findUnique({
      where: {
        id: foodId,
      },
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

    // if food is not found, return an error
    if (!food) {
      return sendJsonResponse<ApiError>(
        {
          error: {
            code: HTTP_NOT_FOUND,
            message: MSG_NOT_FOUND,
            details: `Food with id ${foodId} not found`,
          },
        },
        HTTP_NOT_FOUND,
      );
    }

    // return the food
    return sendJsonResponse<Food | FullFood>(food, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
