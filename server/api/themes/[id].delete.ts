// delete a theme endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id from the request parameters
    const id = Number(getRouterParam(event, "id"));

    // delete theme
    const deletedTheme: Theme = await prisma.theme.delete({
      where: {
        id: id,
      },
    });

    // return the deleted theme
    return sendJsonResponse<Theme>(deletedTheme, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
