// get all preptimes endpoint
export default defineEventHandler(async () => {
  try {
    // get preptimes from database
    const preptimes: Preptime[] = await prisma.preptime.findMany();

    // return the preptimes collection
    return sendCollectionResponse<Preptime>(preptimes);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
