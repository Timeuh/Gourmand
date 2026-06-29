// color unlinking from theme endpoint
export default defineEventHandler(async (event) => {
  try {
    // get ids from the request parameters
    const themeId = Number(getRouterParam(event, "id"));
    const colorId = Number(getRouterParam(event, "colorId"));

    // unlink a color from a theme in the database
    const deletedLink: ThemeColorLink = await prisma.theme_Color.delete({
      where: {
        theme_id_color_id: {
          theme_id: themeId,
          color_id: colorId,
        },
      },
    });

    // return the deleted link
    return sendJsonResponse<ThemeColorLink>(deletedLink, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
