// update a color endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id from the request parameters
    const colorId = Number(getRouterParam(event, "id"));

    // read the request body and validate its data
    const body = await readBody<ColorUpdate>(event);
    const validatedBody: ColorUpdate =
      await colorUpdateValidator.validate(body);

    // update color data
    const updatedColor: Color = await prisma.color.update({
      where: {
        id: colorId,
      },
      data: validatedBody,
    });

    // return the updated color
    return sendJsonResponse<Color>(updatedColor, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
