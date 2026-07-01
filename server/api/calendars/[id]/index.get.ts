// get calendar by id endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id and fullContent param from the request parameters
    const calendarId = Number(getRouterParam(event, "id"));
    const fullContent = getQuery(event).fullContent === "true";

    // get calendar from database by id
    const calendar: Calendar | FullCalendar | null =
      await prisma.calendar.findUnique({
        where: {
          id: calendarId,
        },
        include: fullContent
          ? {
              food: true,
            }
          : undefined,
      });

    // if calendar is not found, return an error
    if (!calendar) {
      return sendJsonResponse<ApiError>(
        {
          error: {
            code: HTTP_NOT_FOUND,
            message: MSG_NOT_FOUND,
            details: `Calendar with id ${calendarId} not found`,
          },
        },
        HTTP_NOT_FOUND,
      );
    }

    // return the calendar
    return sendJsonResponse<Calendar | FullCalendar>(calendar, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
