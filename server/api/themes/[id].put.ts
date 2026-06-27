// update a theme endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id from the request parameters
    const id = Number(getRouterParam(event, "id"));

    // read the request body and validate its data
    const body = await readBody<ThemeUpdate>(event);
    const validatedBody: ThemeUpdate =
      await themeUpdateValidator.validate(body);

    // update theme data
    const updatedTheme: Theme = await prisma.theme.update({
      where: {
        id: id,
      },
      data: validatedBody,
    });

    // return the updated theme
    return sendJsonResponse<Theme>(updatedTheme, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
