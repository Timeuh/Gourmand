// get color by id endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id from the request parameters
    const colorId = Number(getRouterParam(event, "id"));

    // get color from database by id
    const color: Color | null = await prisma.color.findUnique({
      where: {
        id: colorId,
      },
    });

    // if color is not found, return an error
    if (!color) {
      return sendJsonResponse<ApiError>(
        {
          error: {
            code: HTTP_NOT_FOUND,
            message: MSG_NOT_FOUND,
            details: `Color with id ${colorId} not found`,
          },
        },
        HTTP_NOT_FOUND,
      );
    }

    // return the color
    return sendJsonResponse<Color>(color, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
