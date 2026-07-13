// get all categories endpoint
export default defineEventHandler(async () => {
  try {
    // get categories from database
    const categories: Category[] = await prisma.category.findMany();

    // return the categories collection
    return sendCollectionResponse<Category>(categories);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
