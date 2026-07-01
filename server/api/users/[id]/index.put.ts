// update a user endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id from the request parameters
    const userId = Number(getRouterParam(event, "id"));

    // read the request body and validate its data
    const body = await readBody<UserUpdate>(event);
    const validatedBody: UserUpdate = await userUpdateValidator.validate(body);

    // update user data
    const updatedUser: User = await prisma.user.update({
      where: {
        id: userId,
      },
      data: validatedBody,
    });

    // return the updated user
    return sendJsonResponse<User>(updatedUser, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
