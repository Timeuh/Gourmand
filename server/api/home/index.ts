import type { GroupedCalendar } from "~~/shared/types/api";
import type { FullCalendar } from "~~/shared/types/calendar_schema";

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
      today.getDate() - 6,
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

    // get foods eaten this week
    const foodsOfThisWeek: FullCalendar[] = await prisma.calendar.findMany({
      where: {
        food: {
          user_id: idToCheck,
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
        date: "desc",
      },
    });

    // group foods of the week by day
    const foodsByDayMap: Record<string, GroupedCalendar> = {};

    // create keys for last seven days
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - i);

      const key = date.toISOString().split("T")[0] || "";

      foodsByDayMap[key] = {
        date: new Date(date),
        foods: [],
      };
    }

    // add foods for each day
    for (const calendar of foodsOfThisWeek) {
      const key = calendar.date.toISOString().split("T")[0] || "";

      if (foodsByDayMap[key]) {
        foodsByDayMap[key].foods.push(calendar);
      }
    }

    // sort final array by desc day
    const foodsByDay = Object.values(foodsByDayMap).sort(
      (a, b) => b.date.getTime() - a.date.getTime(),
    );

    // group this week's foods to get times eaten
    const groupedFoodsOfThisWeek: ThisWeekFood[] = Object.values(
      foodsOfThisWeek.reduce(
        (acc, entry) => {
          const id = entry.food.id;

          if (!acc[id]) {
            acc[id] = {
              food: entry.food,
              count: 0,
            };
          }

          acc[id].count++;

          return acc;
        },
        {} as Record<number, ThisWeekFood>,
      ),
    );

    // sort the grouped foods by descendant count
    groupedFoodsOfThisWeek.sort((a, b) => {
      return b.count - a.count;
    });

    // get the oldest eaten foods
    const groupedOldestFoods = await prisma.food.findMany({
      where: {
        user_id: idToCheck,
      },
      include: {
        calendars: {
          orderBy: {
            date: "desc",
          },
          take: 1,
        },
      },
    });

    // take 4 of the longest eaten foods
    const oldestFoods: OldestFood[] = groupedOldestFoods
      .map((food) => ({
        food: {
          id: food.id,
          name: food.name,
          image: food.image,
          preptime_id: food.preptime_id,
          user_id: food.user_id,
          plates: food.plates,
        },
        lastEaten: food.calendars[0]?.date.toISOString() ?? null,
      }))
      .sort((a, b) => {
        if (!a.lastEaten) return -1;
        if (!b.lastEaten) return 1;

        return (
          new Date(a.lastEaten).getTime() - new Date(b.lastEaten).getTime()
        );
      })
      .slice(0, 4);

    // limit to 6 foods
    const mostEatenFoodsLimit = foodsOfCurrentMonth.slice(0, 6);

    // limit to 6 foods
    const mostEatenFoodsLimit = foodsOfCurrentMonth.slice(0, 6);

    // get the most eaten foods of this month
    const mostEatenFoodsDetails: Food[] = await prisma.food.findMany({
      where: {
        id: {
          in: mostEatenFoodsLimit.map((g) => g.food_id),
        },
      },
    });

    // format result to include food details and count
    const mostEatenFoods: MostEatenFood[] = mostEatenFoodsLimit.map((g) => {
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
      groupedFoodsOfThisWeek,
      foodsOfThisWeek: foodsByDay,
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
