// delete a category endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id from the request url
    const categoryId = Number(getRouterParam(event, "id"));

    // delete category
    const deletedCategory: Category = await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    // return the deleted category
    return sendJsonResponse<Category>(deletedCategory, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
