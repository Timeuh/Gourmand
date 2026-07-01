// delete a food endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id from the request url
    const foodId = Number(getRouterParam(event, "id"));

    // delete food
    const deletedFood: Food = await prisma.food.delete({
      where: {
        id: foodId,
      },
    });

    // return the deleted food
    return sendJsonResponse<Food>(deletedFood, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
