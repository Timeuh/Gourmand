<script setup lang="ts">
// define props types
interface Props {
  foods: MostEatenFood[] | undefined;
}

// register props
const props = defineProps<Props>();

// return foods from database or default foods if not available
const foodsToDisplay: ComputedRef<MostEatenFood[]> = computed(() => {
  return props.foods && props.foods.length > 0
    ? props.foods
    : mapDefaultFoods<MostEatenFood>((food: Food) => {
        return {
          food,
          count: 1,
        };
      });
});

// calculate the percentage reprensented by current count in comparison with the most eaten food of the month
function calculatePercentage(count: number) {
  return Math.round((count / (foodsToDisplay.value[0]?.count || 1)) * 100);
}
</script>

<template>
  <div class="space-y-2 w-full xl:w-2/6 h-full">
    <div class="flex flex-row justify-between items-center w-full">
      <h2 class="font-bold text-secondary-900 text-lg">
        📊 Les plus mangés ce mois
      </h2>
    </div>
    <div
      class="flex flex-col items-center space-y-3 bg-background-900 shadow-[0_1px_2px_0] shadow-secondary-900/50 p-4 rounded-xl h-full"
    >
      <div
        v-for="food in foodsToDisplay"
        class="flex flex-row justify-between items-center w-full"
      >
        <NuxtImg
          :src="food.food?.image"
          :alt="food.food?.name"
          class="rounded-xl size-20 xl:size-14 object-cover"
        />
        <div class="space-y-2 min-w-[55%]">
          <h3 class="font-bold text-secondary-500 text-sm">
            {{ food.food?.name }}
          </h3>
          <ProgressBar
            height="h-3 xl:h-2"
            :percentage="calculatePercentage(food.count)"
          />
        </div>
        <h4>
          <span class="font-bold text-secondary-900">{{ food.count }}</span>
          fois
        </h4>
      </div>
    </div>
  </div>
</template>
