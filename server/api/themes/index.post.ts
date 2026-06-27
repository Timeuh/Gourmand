// theme creation endpoint
export default defineEventHandler(async (event) => {
  try {
    // read the request body and validate its data
    const body = await readBody<ThemeCreation>(event);
    const validatedBody = await themeCreateValidator.validate(body);

    // create a new theme in the database
    const newTheme: Theme = await prisma.theme.create({
      data: {
        name: validatedBody.name,
      },
    });

    // return the newly created theme
    return sendJsonResponse<Theme>(newTheme, HTTP_CREATED);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
