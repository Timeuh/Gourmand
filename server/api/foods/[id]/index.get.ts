// get food by id endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id from the request parameters
    const foodId = Number(getRouterParam(event, "id"));

    // get food from database by id
    const food: Food | null = await prisma.food.findUnique({
      where: {
        id: foodId,
      },
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
    return sendJsonResponse<Food>(food, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
