// get user by id endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id from the request parameters
    const userId = Number(getRouterParam(event, "id"));

    // get user from database by id
    const user: User | null = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // if user is not found, return an error
    if (!user) {
      return sendJsonResponse<ApiError>(
        {
          error: {
            code: HTTP_NOT_FOUND,
            message: MSG_NOT_FOUND,
            details: `User with id ${userId} not found`,
          },
        },
        HTTP_NOT_FOUND,
      );
    }

    // return the user
    return sendJsonResponse<User>(user, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
