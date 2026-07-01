// get preptime by id endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id from the request parameters
    const preptimeId = Number(getRouterParam(event, "id"));

    // get preptime from database by id
    const preptime: Preptime | null = await prisma.preptime.findUnique({
      where: {
        id: preptimeId,
      },
    });

    // if preptime is not found, return an error
    if (!preptime) {
      return sendJsonResponse<ApiError>(
        {
          error: {
            code: HTTP_NOT_FOUND,
            message: MSG_NOT_FOUND,
            details: `Preptime with id ${preptimeId} not found`,
          },
        },
        HTTP_NOT_FOUND,
      );
    }

    // return the preptime
    return sendJsonResponse<Preptime>(preptime, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
