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
  <div class="space-y-2 w-full xl:h-1/2">
    <div class="flex flex-row justify-between items-center w-full">
      <h2 class="font-bold text-secondary-900 text-lg">
        💡 Suggestions de repas
      </h2>
      <NuxtLink to="/foods" class="flex flex-row items-center text-primary-900">
        <h3>Tout voir</h3>
        <IconChevronRight class="size-5" />
      </NuxtLink>
    </div>
    <div class="gap-4 xl:gap-6 grid grid-cols-2 xl:grid-cols-4 xl:h-[90%]">
      <Card v-for="food in foodsToDisplay" :card-food="food" class="" />
    </div>
  </div>
</template>
