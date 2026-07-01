// get all users endpoint
export default defineEventHandler(async () => {
  try {
    // get users from database
    const users: User[] = await prisma.user.findMany();

    // return the users collection
    return sendCollectionResponse<User>(users);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
