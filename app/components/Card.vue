<script setup lang="ts">
// define props types
interface Props {
  cardFood: OldestFood | undefined;
}

// register props
const props = withDefaults(defineProps<Props>(), {
  cardFood: () => ({
    food: {
      id: 1,
      user_id: 1,
      preptime_id: 1,
      plates: 1,
      name: "Default",
      image: "/assets/default_food.png",
    },
    lastEaten: new Date().toString(),
  }),
});
</script>

<template>
  <div
    class="relative shadow-[0_2px_4px_0] shadow-secondary-900/50 rounded-xl h-[20vh] overflow-hidden"
  >
    <NuxtImg
      :src="props.cardFood.food?.image"
      :alt="props.cardFood.food?.name"
      class="w-full h-full object-cover"
    />
    <div
      class="bottom-0 absolute flex flex-row justify-between items-center bg-linear-to-t from-black via-60% via-black/80 to-black/20 backdrop-blur-xs p-2 w-full"
    >
      <div class="space-y-1 w-full">
        <h3 class="max-w-[95%] text-background-900 text-sm text-balance">
          {{ props.cardFood.food?.name }}
        </h3>
        <h4 class="text-secondary-100 text-xs">
          {{ daysFromToday(new Date(props.cardFood.lastEaten || "")) }}
        </h4>
      </div>
      <button
        class="flex flex-col justify-center items-center bg-background-900 rounded-xl min-w-1/5 size-7"
      >
        <IconPlus class="size-6 text-primary-900" />
      </button>
    </div>
  </div>
</template>
