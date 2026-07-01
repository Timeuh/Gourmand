// update a calendar endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id from the request parameters
    const calendarId = Number(getRouterParam(event, "id"));

    // read the request body and validate its data
    const body = await readBody<CalendarUpdate>(event);
    const validatedBody: CalendarUpdate =
      await calendarUpdateValidator.validate(body);

    // update calendar data
    const updatedCalendar: Calendar = await prisma.calendar.update({
      where: {
        id: calendarId,
      },
      data: validatedBody,
    });

    // return the updated calendar
    return sendJsonResponse<Calendar>(updatedCalendar, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
