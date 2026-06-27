// get theme by id endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id from the request parameters
    const id = Number(getRouterParam(event, "id"));

    // get theme from database by id
    const theme: Theme | null = await prisma.theme.findUnique({
      where: {
        id: id,
      },
    });

    // if theme is not found, return an error
    if (!theme) {
      return sendJsonResponse<ApiError>(
        {
          error: {
            code: HTTP_NOT_FOUND,
            message: MSG_NOT_FOUND,
            details: `Theme with id ${id} not found`,
          },
        },
        HTTP_NOT_FOUND,
      );
    }

    // return the theme
    return sendJsonResponse<Theme>(theme, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
