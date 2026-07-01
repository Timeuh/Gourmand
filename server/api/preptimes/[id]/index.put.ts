// update a preptime endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id from the request parameters
    const preptimeId = Number(getRouterParam(event, "id"));

    // read the request body and validate its data
    const body = await readBody<PreptimeUpdate>(event);
    const validatedBody: PreptimeUpdate =
      await preptimeUpdateValidator.validate(body);

    // update preptime data
    const updatedPreptime: Preptime = await prisma.preptime.update({
      where: {
        id: preptimeId,
      },
      data: validatedBody,
    });

    // return the updated preptime
    return sendJsonResponse<Preptime>(updatedPreptime, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
