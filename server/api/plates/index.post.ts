// plate creation endpoint
export default defineEventHandler(async (event) => {
  try {
    // read the request body and validate its data
    const body = await readBody<PlateCreation>(event);
    const validatedBody = await plateCreateValidator.validate(body);

    // create a new plate in the database
    const newPlate: Plate = await prisma.plate.create({
      data: {
        number: validatedBody.number,
      },
    });

    // return the newly created plate
    return sendJsonResponse<Plate>(newPlate, HTTP_CREATED);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
