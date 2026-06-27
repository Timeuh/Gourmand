// get all themes endpoint
export default defineEventHandler(async () => {
  try {
    // get themes from database
    const themes: Theme[] = await prisma.theme.findMany();

    // return the themes collection
    return sendCollectionResponse<Theme>(themes);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
