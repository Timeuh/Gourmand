// get category by id endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id from the request parameters
    const categoryId = Number(getRouterParam(event, "id"));

    // get category from database by id
    const category: Category | null = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    // if category is not found, return an error
    if (!category) {
      return sendJsonResponse<ApiError>(
        {
          error: {
            code: HTTP_NOT_FOUND,
            message: MSG_NOT_FOUND,
            details: `Category with id ${categoryId} not found`,
          },
        },
        HTTP_NOT_FOUND,
      );
    }

    // return the category
    return sendJsonResponse<Category>(category, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
