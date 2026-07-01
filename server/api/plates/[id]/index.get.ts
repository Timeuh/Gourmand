// get plate by id endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id from the request parameters
    const plateId = Number(getRouterParam(event, "id"));

    // get plate from database by id
    const plate: Plate | null = await prisma.plate.findUnique({
      where: {
        id: plateId,
      },
    });

    // if plate is not found, return an error
    if (!plate) {
      return sendJsonResponse<ApiError>(
        {
          error: {
            code: HTTP_NOT_FOUND,
            message: MSG_NOT_FOUND,
            details: `Plate with id ${plateId} not found`,
          },
        },
        HTTP_NOT_FOUND,
      );
    }

    // return the plate
    return sendJsonResponse<Plate>(plate, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
