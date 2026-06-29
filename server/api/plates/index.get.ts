// get all plates endpoint
export default defineEventHandler(async () => {
  try {
    // get plates from database
    const plates: Plate[] = await prisma.plate.findMany();

    // return the plates collection
    return sendCollectionResponse<Plate>(plates);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
