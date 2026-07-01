import type { FullCalendar } from "~~/shared/types/calendar_schema";
import type { MostEatenFood } from "~~/shared/types/food_schema";

// get all home page information endpoint
export default defineEventHandler(async (event) => {
  try {
    // get calendars from a specific user
    const userId = Number(getQuery(event).userId);

    // check if userId is defined and valid
    const userIdDefined = userId !== undefined && !isNaN(userId);

    // if userId is not defined or invalid, return a bad request error
    if (!userIdDefined) {
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

    // get current date and calculate the start of the previous month, current month, and next month
    const today = new Date();
    const lastWeekStart = new Date(today.getDate() - 7);
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
          user_id: userId,
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
          user_id: userId,
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
        user_id: userId,
      },
      orderBy: {
        calendars: {
          _count: "desc",
        },
      },
      take: 4,
    });

    // get foods eaten this week
    const foodsOfThisWeek: FullCalendar[] = await prisma.calendar.findMany({
      where: {
        food: {
          user_id: userId,
        },
        date: {
          gte: lastWeekStart,
          lt: today,
        },
      },
      include: {
        food: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    // get the 4 oldest eaten foods ids and date
    const groupedOldestFoods = await prisma.calendar.groupBy({
      by: ["food_id"],
      where: {
        food: {
          user_id: userId,
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
      lastEaten: g._max.date,
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
