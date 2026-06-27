// get all colors endpoint
export default defineEventHandler(async () => {
  try {
    // get colors from database
    const colors = await prisma.color.findMany();

    // return the colors collection
    return sendCollectionResponse<Color>(colors);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
