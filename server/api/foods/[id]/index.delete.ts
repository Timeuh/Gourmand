// delete a food endpoint
export default defineEventHandler(async (event) => {
  try {
    // get id from the request url
    const foodId = Number(getRouterParam(event, "id"));

    // delete food
    const deletedFood: Food = await prisma.food.delete({
      where: {
        id: foodId,
      },
    });

    // format food image name for storage deletion
    const filename = deletedFood.image.split("/uploads/")[1];

    // Get storage instance
    const storage = useStorage("uploads");

    // store file in the storage
    await storage.removeItem(filename || "");

    // return the deleted food
    return sendJsonResponse<Food>(deletedFood, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
