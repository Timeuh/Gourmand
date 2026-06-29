// get all themes endpoint
export default defineEventHandler(async (event) => {
  try {
    // get fullContent param from the request parameters
    const fullContent = getQuery(event).fullContent === "true";

    // get themes from database, with color links if fullContent is true
    const themes: Theme[] | FullTheme[] = await prisma.theme.findMany({
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

    // return the themes collection
    return sendCollectionResponse<Theme | FullTheme>(themes);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
