import type { MostEatenFood, ThisWeekFood } from "~~/shared/types/food_schema";

// get all home page information endpoint
export default defineEventHandler(async (event) => {
  try {
    // get calendars from a specific user
    const userId = Number(getQuery(event).userId);

    // get user from session
    const { user } = await getUserSession(event);

    // check if userId is defined and valid
    const userIdDefined = userId !== undefined && !isNaN(userId);

    // if userId is not defined or invalid and there's no user in session, return a bad request error
    if (!userIdDefined && !user) {
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

    // get current date and calculate the start of the previous month, current month, and next month
    const today = new Date();
    const lastWeekStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7,
    );
    const previousMonthStart = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1,
    );
    const currentMonthStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      1,
    );
    const nextMonthStart = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1,
    );

    // get foods eaten in the previous month
    const foodsOfPreviousMonth = await prisma.calendar.groupBy({
      by: ["food_id"],
      where: {
        food: {
          user_id: idToCheck,
        },
        date: {
          gte: previousMonthStart,
          lt: currentMonthStart,
        },
      },
    });

    // get foods eaten this month
    const foodsOfCurrentMonth = await prisma.calendar.groupBy({
      by: ["food_id"],
      where: {
        food: {
          user_id: idToCheck,
        },
        date: {
          gte: currentMonthStart,
          lt: nextMonthStart,
        },
      },
      _count: {
        food_id: true,
      },
      orderBy: {
        _count: {
          food_id: "desc",
        },
      },
    });

    // get 4 favorite foods
    const favoriteFoods: Food[] = await prisma.food.findMany({
      where: {
        user_id: idToCheck,
      },
      orderBy: {
        calendars: {
          _count: "desc",
        },
      },
      take: 4,
    });

    // get different foods eaten this week with their number of times
    const groupedFoodsOfThisWeek = await prisma.calendar.groupBy({
      by: ["food_id"],
      where: {
        food: {
          user_id: idToCheck,
        },
        date: {
          gte: lastWeekStart,
          lt: today,
        },
      },
      _count: {
        food_id: true,
      },
      orderBy: {
        _count: {
          food_id: "desc",
        },
      },
    });

    // get the foods eaten this week
    const foodsOfThisWeekDetails: Food[] = await prisma.food.findMany({
      where: {
        id: {
          in: groupedFoodsOfThisWeek.map((g) => g.food_id),
        },
      },
    });

    // format result to include food details and count
    const foodsOfThisWeek: ThisWeekFood[] = groupedFoodsOfThisWeek.map((g) => {
      const food = foodsOfThisWeekDetails.find((f) => f.id === g.food_id);

      return {
        food,
        count: g._count.food_id,
      };
    });

    // get the 4 oldest eaten foods ids and date
    const groupedOldestFoods = await prisma.calendar.groupBy({
      by: ["food_id"],
      where: {
        food: {
          user_id: idToCheck,
        },
      },
      _max: {
        date: true,
      },
      orderBy: {
        _max: {
          date: "asc",
        },
      },
      take: 4,
    });

    // get the 4 oldest eaten foods details
    const oldestFoodsDetails: Food[] = await prisma.food.findMany({
      where: {
        id: {
          in: groupedOldestFoods.map((g) => g.food_id),
        },
      },
    });

    // format result to include food details and last eaten date
    const oldestFoods: OldestFood[] = groupedOldestFoods.map((g) => ({
      food: oldestFoodsDetails.find((f) => f.id === g.food_id),
      lastEaten: g._max.date?.toISOString(),
    }));

    // get the most eaten foods of this month
    const mostEatenFoodsDetails: Food[] = await prisma.food.findMany({
      where: {
        id: {
          in: foodsOfCurrentMonth.map((g) => g.food_id),
        },
      },
    });

    // format result to include food details and count
    const mostEatenFoods: MostEatenFood[] = foodsOfCurrentMonth.map((g) => {
      const food = mostEatenFoodsDetails.find((f) => f.id === g.food_id);

      return {
        food,
        count: g._count.food_id,
      };
    });

    // create object for the home data to be returned
    const homeData: HomeData = {
      foodsOfPreviousMonth: foodsOfPreviousMonth.length,
      foodsOfCurrentMonth: foodsOfCurrentMonth.length,
      favoriteFoods,
      foodsOfThisWeek,
      oldestFoods,
      mostEatenFoods,
    };

    // return the home data
    return sendJsonResponse<HomeData>(homeData, HTTP_OK);
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
