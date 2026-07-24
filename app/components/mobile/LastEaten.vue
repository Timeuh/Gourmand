<script setup lang="ts">
// define props types
interface Props {
  foods: GroupedCalendar[] | undefined;
}

// register props
const props = defineProps<Props>();
</script>

<template>
  <div class="xl:hidden flex flex-col items-center space-y-4">
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
    <div class="flex flex-row space-x-3 w-full">
      <div class="flex flex-col items-center">
        <div
          class="flex flex-col justify-between items-center bg-secondary-100 w-1 h-full"
        >
          <div
            v-for="(_food, index) in props.foods"
            :key="index"
            class="flex flex-col justify-center items-center h-10"
          >
            <div class="bg-secondary-900 rounded-full size-3" />
          </div>
        </div>
      </div>
      <div class="space-y-3 w-[95%]">
        <div
          v-for="(food, index) in props.foods"
          :key="index"
          class="flex flex-row justify-between items-center w-full h-10"
        >
          <h3 class="w-1/3 text-secondary-900 text-sm">
            {{ formatWeekDate(new Date(food.date)) }}
          </h3>
          <div
            class="flex flex-row items-center space-x-3 w-3/5 overflow-x-scroll"
          >
            <div
              v-for="weekFood in food.foods"
              :key="weekFood.food_id"
              class="flex flex-row items-center space-x-2 bg-background-900 shadow-[0_1px_2px_0] shadow-secondary-900/50 p-2 rounded-md h-10"
            >
              <NuxtImg
                :src="weekFood.food.image"
                :alt="weekFood.food.name"
                class="rounded-full size-7 object-cover shrink-0"
              />
              <h4 class="text-nowrap shrink-0">{{ weekFood.food.name }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
