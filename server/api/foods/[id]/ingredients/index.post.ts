// link or unlink multiple ingredients at once
export default defineEventHandler(async (event) => {
  try {
    // get ids from the request parameters
    const foodId = Number(getRouterParam(event, "id"));
    // read the request body and validate its data
    const ingredientIds = await readBody<number[]>(event);
    console.log(JSON.stringify(ingredientIds));

    // get existing ingredients
    const existingLinks = await prisma.food_Ingredient.findMany({
      where: {
        food_id: foodId,
      },
      select: {
        ingredient_id: true,
      },
    });

    // turn existing ingredients into an array of their ids
    const existingIds: number[] = existingLinks.map(
      (link) => link.ingredient_id,
    );

    // links to create
    const idsToCreate: number[] = ingredientIds.filter(
      (id) => !existingIds.includes(id),
    );

    // links to delete
    const idsToDelete: number[] = existingIds.filter(
      (id) => !ingredientIds.includes(id),
    );

    // delete the links if needed
    if (idsToDelete.length) {
      await prisma.food_Ingredient.deleteMany({
        where: {
          food_id: foodId,
          ingredient_id: {
            in: idsToDelete,
          },
        },
      });
    }

    // create the links if needed
    if (idsToCreate.length) {
      await prisma.food_Ingredient.createMany({
        data: idsToCreate.map((id) => ({
          food_id: foodId,
          ingredient_id: id,
        })),
        skipDuplicates: true,
      });
    }

    // send a response in any case
    return sendJsonResponse(null, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
