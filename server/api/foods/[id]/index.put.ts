// update a food endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id from the request parameters
    const foodId = Number(getRouterParam(event, "id"));

    // read the request body and validate its data
    const body = await readBody<FoodUpdate>(event);
    const validatedBody: FoodUpdate = await foodUpdateValidator.validate(body);

    // update food data
    const updatedFood: Food = await prisma.food.update({
      where: {
        id: foodId,
      },
      data: validatedBody,
    });

    // return the updated food
    return sendJsonResponse<Food>(updatedFood, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
