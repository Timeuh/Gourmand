// get all calendars endpoint
export default defineEventHandler(async (event) => {
  try {
    // get fullContent param from the request parameters
    const fullContent = getQuery(event).fullContent === "true";
    // get calendars from a specific user
    const userId = getQuery(event).userId;

    // if userId is specified but invalid, return a bad request error
    if (userId !== undefined && isNaN(Number(userId))) {
      return sendJsonResponse<ApiError>(
        {
          error: {
            code: HTTP_BAD_REQUEST,
            message: MSG_BAD_REQUEST,
            details:
              "Invalid userId parameter. Please provide a valid number for the userId query parameter.",
          },
        },
        HTTP_BAD_REQUEST,
      );
    }

    // get calendars from database
    const calendars: Calendar[] | FullCalendar[] =
      await prisma.calendar.findMany({
        where: userId
          ? {
              food: {
                user_id: Number(userId),
              },
            }
          : undefined,
        include: fullContent
          ? {
              food: true,
            }
          : undefined,
      });

    // return the calendars collection
    return sendCollectionResponse<Calendar | FullCalendar>(calendars);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
