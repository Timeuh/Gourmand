// category creation endpoint
export default defineEventHandler(async (event) => {
  try {
    // read the request body and validate its data
    const body = await readBody<CategoryCreation>(event);
    const validatedBody: CategoryCreation =
      await categoryCreateValidator.validate(body);

    // create a new category in the database
    const newCategory: Category = await prisma.category.create({
      data: {
        name: validatedBody.name,
      },
    });

    // return the newly created category
    return sendJsonResponse<Category>(newCategory, HTTP_CREATED);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
