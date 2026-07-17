// calendar creation endpoint
export default defineEventHandler(async (event) => {
  try {
    // read the request body and validate its data
    const body = await readBody<CalendarCreation>(event);
    const validatedBody = await calendarCreateValidator.validate(body);

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
