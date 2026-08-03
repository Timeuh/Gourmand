// get all foods endpoint
export default defineEventHandler(async (event) => {
  try {
    // get fullContent param from the request parameters
    const fullContent = getQuery(event).fullContent === "true";
    // get fullContent param from the request parameters
    const lastEaten = getQuery(event).lastEaten === "true";
    // get calendars from a specific user
    const userId = getQuery(event).userId;

    // get user from session
    const { user } = await getUserSession(event);

    // if userId is specified but invalid, return a bad request error
    if (!user && userId !== undefined && isNaN(Number(userId))) {
      return sendJsonResponse<ApiError>(
        {
          error: {
            code: HTTP_BAD_REQUEST,
            message: MSG_BAD_REQUEST,
            details:
              "Invalid userId parameter. Please provide a valid number for the userId query parameter.",
          },
        },
        HTTP_BAD_REQUEST,
      );
    }

    // user either the id of the user in session or the provided user id
    const idToCheck = user?.id || Number(userId);

    // get foods from database
    const foods = await prisma.food.findMany({
      where: idToCheck
        ? {
            user_id: idToCheck,
          }
        : undefined,
      include: {
        ...(fullContent && {
          preptime: true,
          user: true,
          foodIngredients: {
            include: {
              ingredient: {
                include: {
                  category: true,
                },
              },
            },
          },
        }),
        ...(lastEaten && {
          calendars: {
            orderBy: {
              date: "desc",
            },
            take: 1,
            select: {
              date: true,
            },
          },
        }),
      },
    });

    // show the most recent first
    foods.reverse();

    // if the user wants last eaten date for each food
    if (lastEaten) {
      // format foods to match the OldestFood type
      const foodsToReturn: OldestFood[] = foods.map(
        ({ calendars, ...food }) => {
          return {
            food,
            lastEaten: calendars[0]?.date ?? null,
          } as OldestFood;
        },
      );

      // return the formated foods
      return sendCollectionResponse<OldestFood>(foodsToReturn);
    }

    // return the foods collection
    return sendCollectionResponse<Food | FullFood>(foods);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
