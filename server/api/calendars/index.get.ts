// get all calendars endpoint
export default defineEventHandler(async () => {
  try {
    // get calendars from database
    const calendars: Calendar[] = await prisma.calendar.findMany();

    // return the calendars collection
    return sendCollectionResponse<Calendar>(calendars);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
