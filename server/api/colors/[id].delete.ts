// delete a color endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id from the request parameters
    const id = Number(getRouterParam(event, "id"));

    // delete color
    const deletedColor: Color = await prisma.color.delete({
      where: {
        id: id,
      },
    });

    // return the deleted color
    return sendJsonResponse<Color>(deletedColor, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
