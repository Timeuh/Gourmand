<script setup lang="ts">
// define props types
interface Props {
  foods: OldestFood[] | undefined;
}

// register props
const props = defineProps<Props>();

// return foods from database or default foods if not available
const foodsToDisplay: ComputedRef<OldestFood[]> = computed(() => {
  return props.foods && props.foods.length > 0
    ? props.foods
    : mapDefaultFoods<OldestFood>((food: Food) => {
        return {
          food,
          lastEaten: new Date().toISOString(),
        };
      });
});
</script>

<template>
  <div class="space-y-2 w-full">
    <div class="flex flex-row justify-between items-center w-full">
      <h2 class="font-bold text-secondary-900 text-lg">
        💡 Suggestions de repas
      </h2>
      <NuxtLink to="/foods" class="flex flex-row items-center text-primary-900">
        <h3>Tout voir</h3>
        <IconChevronRight class="size-5" />
      </NuxtLink>
    </div>
    <div class="gap-4 grid grid-cols-2">
      <div
        v-for="food in foodsToDisplay"
        class="relative shadow-[0_2px_4px_0] shadow-secondary-900/50 rounded-xl w-full h-full overflow-hidden"
      >
        <NuxtImg
          :src="food.food?.image"
          :alt="food.food?.name"
          class="w-full h-full min-h-[20vh] object-cover"
        />
        <div
          class="bottom-0 absolute flex flex-row justify-between items-center bg-linear-to-t from-black via-60% via-black/80 to-black/20 backdrop-blur-xs p-2 w-full"
        >
          <div class="space-y-1 w-full">
            <h3 class="max-w-[95%] text-background-900 text-sm text-balance">
              {{ food.food?.name }}
            </h3>
            <h4 class="text-secondary-100 text-xs">
              {{ daysFromToday(new Date(food.lastEaten || "")) }}
            </h4>
          </div>
          <button
            class="flex flex-col justify-center items-center bg-background-900 rounded-xl min-w-1/5 size-7"
          >
            <IconPlus class="size-6 text-primary-900" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
