// color creation endpoint
export default defineEventHandler(async (event) => {
  try {
    // read the request body and validate its data
    const body = await readBody<ColorCreation>(event);
    const validatedBody = await colorCreateValidator.validate(body);

    // create a new color in the database
    const newColor = await prisma.color.create({
      data: {
        code: validatedBody.code,
      },
    });

    // return the newly created color
    return sendJsonResponse<Color>(newColor, HTTP_CREATED);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
