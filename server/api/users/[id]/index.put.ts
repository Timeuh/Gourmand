// update a user endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id from the request parameters
    const userId = Number(getRouterParam(event, "id"));

    // get user from session
    const { user } = await getUserSession(event);

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

    // if user session exists, set updated data into the session
    if (user) {
      await replaceUserSession(event, {
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          theme_id: updatedUser.theme_id,
          name: user.name,
          picture: user.picture,
          month_objective: updatedUser.month_objective,
          deletion_requested_at: updatedUser.deletion_requested_at,
          deletion_scheduled_at: updatedUser.deletion_scheduled_at,
        },
      });
    }

    // return the updated user
    return sendJsonResponse<User>(updatedUser, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
