// get theme by id endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id and fullContent param from the request parameters
    const themeId = Number(getRouterParam(event, "id"));
    const fullContent = getQuery(event).fullContent === "true";

    // get theme from database by id, with color links if fullContent is true
    const theme: Theme | FullTheme | null = await prisma.theme.findUnique({
      where: {
        id: themeId,
      },
      include: fullContent
        ? {
            themeColors: {
              include: {
                color: true,
                theme_id: false,
                color_id: false,
              },
            },
          }
        : undefined,
    });

    // if theme is not found, return an error
    if (!theme) {
      return sendJsonResponse<ApiError>(
        {
          error: {
            code: HTTP_NOT_FOUND,
            message: MSG_NOT_FOUND,
            details: `Theme with id ${themeId} not found`,
          },
        },
        HTTP_NOT_FOUND,
      );
    }

    // return the theme
    return sendJsonResponse<Theme | FullTheme>(theme, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
