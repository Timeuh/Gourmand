// preptime creation endpoint
export default defineEventHandler(async (event) => {
  try {
    // read the request body and validate its data
    const body = await readBody<PreptimeCreation>(event);
    const validatedBody = await preptimeCreateValidator.validate(body);

    // create a new preptime in the database
    const newPreptime: Preptime = await prisma.preptime.create({
      data: {
        time: validatedBody.time,
      },
    });

    // return the newly created preptime
    return sendJsonResponse<Preptime>(newPreptime, HTTP_CREATED);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
