// food creation endpoint
export default defineEventHandler(async (event) => {
  try {
    // read the request body and validate its data
    const body = await readBody<FoodCreation>(event);
    const validatedBody = await foodCreateValidator.validate(body);

    // create a new food in the database
    const newFood: Food = await prisma.food.create({
      data: {
        name: validatedBody.name,
        image: validatedBody.image,
        plate_id: validatedBody.plate_id,
        preptime_id: validatedBody.preptime_id,
        user_id: validatedBody.user_id,
      },
    });

    // return the newly created food
    return sendJsonResponse<Food>(newFood, HTTP_CREATED);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
