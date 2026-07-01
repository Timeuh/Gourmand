// color linking to theme endpoint
export default defineEventHandler(async (event) => {
  try {
    // get ids from the request parameters
    const themeId = Number(getRouterParam(event, "id"));
    const colorId = Number(getRouterParam(event, "colorId"));

    // link a color to a theme in the database
    const newLink: ThemeColorLink = await prisma.theme_Color.create({
      data: {
        theme_id: themeId,
        color_id: colorId,
      },
    });

    // return the newly created link
    return sendJsonResponse<ThemeColorLink>(newLink, HTTP_CREATED);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
