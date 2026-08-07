// get all calendars endpoint
export default defineEventHandler(async (event) => {
  try {
    // get fullContent param from the request parameters
    const fullContent = getQuery(event).fullContent === "true";
    // get calendars from a specific user
    const userId = getQuery(event).userId;
    // get date to check from the request parameters
    const dateToCheck = getQuery(event).date as string | undefined;
    // get month to check from the request parameters
    const monthToCheck = getQuery(event).month as string | undefined;

    // convert dateToCheck to a Date object if it's provided
    const date = new Date(dateToCheck!);

    // convert monthToCheck to a Date object if it's provided
    const month = new Date(monthToCheck!);

    // start of the day to check
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    // end of the day to check
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    // start of the month to check
    const monthStart = new Date(month.getFullYear(), month.getMonth(), 1);

    // end of the month to check
    const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    // get user from session
    const { user } = await getUserSession(event);

    // if there's no user in session and userId is specified but invalid, return a bad request error
    if (!user && userId !== undefined && isNaN(Number(userId))) {
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

    // user either the id of the user in session or the provided user id
    const idToCheck = user?.id || Number(userId);

    // get calendars from database
    const calendars: Calendar[] | FullCalendar[] =
      await prisma.calendar.findMany({
        where: {
          ...(idToCheck && {
            food: {
              user_id: idToCheck,
            },
          }),
          ...(dateToCheck &&
            !monthToCheck && {
              date: {
                gte: start,
                lte: end,
              },
            }),
          ...(monthToCheck &&
            !dateToCheck && {
              date: {
                gte: monthStart,
                lte: monthEnd,
              },
            }),
        },
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
