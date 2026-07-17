// update a category endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id from the request parameters
    const categoryId = Number(getRouterParam(event, "id"));

    // read the request body and validate its data
    const body = await readBody<CategoryUpdate>(event);
    const validatedBody: CategoryUpdate =
      await categoryUpdateValidator.validate(body);

    // update category data
    const updatedCategory: Category = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: validatedBody,
    });

    // return the updated category
    return sendJsonResponse<Category>(updatedCategory, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
