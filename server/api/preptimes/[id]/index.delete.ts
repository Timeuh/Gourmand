// delete a preptime endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id from the request url
    const preptimeId = Number(getRouterParam(event, "id"));

    // delete preptime
    const deletedPreptime: Preptime = await prisma.preptime.delete({
      where: {
        id: preptimeId,
      },
    });

    // return the deleted preptime
    return sendJsonResponse<Preptime>(deletedPreptime, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
