// get all calendars endpoint
export default defineEventHandler(async (event) => {
  try {
    // get fullContent param from the request parameters
    const fullContent = getQuery(event).fullContent === "true";

    // get calendars from database
    const calendars: Calendar[] | FullCalendar[] =
      await prisma.calendar.findMany({
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
