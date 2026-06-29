// delete a plate endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id from the request url
    const plateId = Number(getRouterParam(event, "id"));

    // delete plate
    const deletedPlate: Plate = await prisma.plate.delete({
      where: {
        id: plateId,
      },
    });

    // return the deleted plate
    return sendJsonResponse<Plate>(deletedPlate, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
