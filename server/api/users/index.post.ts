// user creation endpoint
export default defineEventHandler(async (event) => {
  try {
    // read the request body and validate its data
    const body = await readBody<UserCreation>(event);
    const validatedBody = await userCreateValidator.validate(body);

    // create a new user in the database
    const newUser: User = await prisma.user.create({
      data: {
        email: validatedBody.email,
        theme_id: validatedBody.theme_id,
      },
    });

    // return the newly created user
    return sendJsonResponse<User>(newUser, HTTP_CREATED);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
