// delete a user endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id from the request url
    const userId = Number(getRouterParam(event, "id"));

    // delete user
    const deletedUser: User = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    // return the deleted user
    return sendJsonResponse<User>(deletedUser, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
