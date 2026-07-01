// delete a calendar endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id from the request url
    const calendarId = Number(getRouterParam(event, "id"));

    // delete calendar
    const deletedCalendar: Calendar = await prisma.calendar.delete({
      where: {
        id: calendarId,
      },
    });

    // return the deleted calendar
    return sendJsonResponse<Calendar>(deletedCalendar, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
