// update a plate endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id from the request parameters
    const plateId = Number(getRouterParam(event, "id"));

    // read the request body and validate its data
    const body = await readBody<PlateUpdate>(event);
    const validatedBody: PlateUpdate =
      await plateUpdateValidator.validate(body);

    // update plate data
    const updatedPlate: Plate = await prisma.plate.update({
      where: {
        id: plateId,
      },
      data: validatedBody,
    });

    // return the updated plate
    return sendJsonResponse<Plate>(updatedPlate, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
