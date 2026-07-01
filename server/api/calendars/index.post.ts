// calendar creation endpoint
export default defineEventHandler(async (event) => {
  try {
    // read the request body and validate its data
    const body = await readBody<CalendarCreation>(event);
    const validatedBody = await calendarCreateValidator.validate(body);

    // count number of meals for the given user and date
    const totalMeals = await prisma.calendar.count({
      where: {
        date: validatedBody.date,
        food: {
          user_id: validatedBody.user_id,
        },
      },
    });

    // meals cannot exceed 2 for a given user and date, return an error if the limit is exceeded
    if (totalMeals >= 2) {
      return sendJsonResponse<ApiError>(
        {
          error: {
            code: HTTP_BAD_REQUEST,
            message: MSG_MEAL_LIMIT_EXCEEDED,
            details: `Meals for user with id ${validatedBody.user_id} on date ${validatedBody.date.toISOString()} are at the maximum limit of 2`,
          },
        },
        HTTP_BAD_REQUEST,
      );
    }

    // create a new calendar in the database
    const newCalendar: Calendar = await prisma.calendar.create({
      data: {
        date: validatedBody.date,
        food_id: validatedBody.food_id,
      },
    });

    // return the newly created calendar
    return sendJsonResponse<Calendar>(newCalendar, HTTP_CREATED);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
