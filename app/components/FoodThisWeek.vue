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
  <div class="xl:hidden space-y-2 w-full">
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
    <div class="pb-2 w-full overflow-x-auto">
      <div class="flex flex-row items-center space-x-4 w-max">
        <Card v-for="food in foodsToDisplay" :card-food="food" class="w-44" />
      </div>
    </div>
  </div>
</template>
