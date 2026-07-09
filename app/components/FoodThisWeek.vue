<script setup lang="ts">
// define props types
interface Props {
  foods: ThisWeekFood[] | undefined;
}

// register props
const props = defineProps<Props>();

// return foods from database or default foods if not available
const foodsToDisplay: ComputedRef<ThisWeekFood[]> = computed(() => {
  return props.foods && props.foods.length > 0
    ? props.foods
    : mapDefaultFoods<ThisWeekFood>((food: Food) => {
        return {
          food,
          count: 1,
        };
      });
});
</script>

<template>
  <div class="space-y-2 w-full">
    <div class="flex flex-row justify-between items-center w-full">
      <h2 class="font-bold text-secondary-900 text-lg">🗓️ Cette semaine</h2>
      <NuxtLink
        to="/calendar"
        class="flex flex-row items-center text-primary-900"
      >
        <h3>Calendrier</h3>
        <IconChevronRight class="size-5" />
      </NuxtLink>
    </div>
    <div class="flex flex-row items-center space-x-4 overflow-scroll">
      <div
        v-for="food in foodsToDisplay"
        class="shadow-[0_2px_2px_0] shadow-secondary-900/50 rounded-xl min-w-[40vw]"
      >
        <NuxtImg
          :src="food.food?.image"
          :alt="food.food?.name"
          class="rounded-t-xl w-full h-[20vh] object-cover"
        />
        <div
          class="flex flex-row justify-between items-center bg-background-900 p-2 px-3 rounded-b-lg w-full min-h-[8vh]"
        >
          <div class="space-y-1 max-w-3/4">
            <h3 class="font-bold text-xs text-balance">
              {{ food.food?.name }}
            </h3>
            <h4 class="text-primary-900 text-xs">{{ food.count }} fois</h4>
          </div>
          <button
            class="flex flex-col justify-center items-center bg-primary-900 rounded-full min-w-1/4 size-9"
          >
            <IconPlus class="size-6 text-background-900" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
