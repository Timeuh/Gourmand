<script setup lang="ts">
// define props types
interface Props {
  foods: GroupedCalendar[] | undefined;
}

// register props
const props = defineProps<Props>();

// return foods from database or default foods if not available
const foodsToDisplay: ComputedRef<GroupedCalendar[]> = computed(() => {
  return props.foods && props.foods.length > 0
    ? props.foods
    : mapDefaultFoods<GroupedCalendar>((food: Food) => {
        return {
          date: new Date(),
          foods: [{ food, id: 1, date: new Date(), food_id: 1 }],
        };
      });
});
</script>

<template>
  <div class="hidden xl:flex flex-col items-center space-y-2 h-full">
    <div class="flex flex-row justify-between items-center w-full">
      <h2 class="font-bold text-secondary-900 text-lg">
        🕔 Les derniers plats
      </h2>
      <NuxtLink
        to="/calendar"
        class="flex flex-row items-center text-primary-900"
      >
        <h3>Calendrier</h3>
        <IconChevronRight class="size-5" />
      </NuxtLink>
    </div>
    <div class="gap-2 grid grid-cols-7 w-full h-full">
      <div
        v-for="food in foodsToDisplay"
        class="relative flex flex-col space-y-2"
      >
        <h3 class="text-secondary-900 text-lg">
          {{ formatWeekDate(new Date(food.date)) }}
        </h3>
        <div class="flex flex-row gap-2 pe-2 w-full">
          <div
            v-for="weekFood in food.foods"
            class="group relative flex-1 max-w-14"
          >
            <div
              class="inline-flex -top-9 -left-2 z-10 absolute bg-background-900 opacity-0 group-hover:opacity-100 px-2 py-1 rounded-md transition duration-500 ease-in-out"
            >
              <h4 class="text-sm whitespace-nowrap">
                {{ weekFood.food.name }}
              </h4>
            </div>
            <NuxtImg
              :src="weekFood.food.image"
              :alt="weekFood.food.name"
              class="shadow-[0_1px_2px_2px] shadow-secondary-900/50 rounded-full w-full object-cover aspect-square"
            />
          </div>
        </div>
        <div class="right-0 absolute bg-secondary-100 w-0.5 h-4/5" />
      </div>
    </div>
  </div>
</template>
