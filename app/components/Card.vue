<script setup lang="ts">
// define props types
interface Props {
  cardFood: OldestFood | ThisWeekFood | undefined;
  class: string;
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
    count: 1,
  }),
  class: "",
});
</script>

<template>
  <div
    class="relative shadow-[0_2px_4px_0] shadow-secondary-900/50 rounded-xl h-[20vh] overflow-hidden"
    :class="props.class"
  >
    <NuxtImg
      :src="props.cardFood.food?.image"
      :alt="props.cardFood.food?.name"
      class="w-full h-full object-cover"
    />
    <div
      v-if="'lastEaten' in props.cardFood"
      class="bottom-0 absolute flex flex-row justify-between items-center bg-linear-to-t from-black via-60% via-black/80 to-black/20 backdrop-blur-xs p-2 w-full"
    >
      <div class="space-y-1 w-full">
        <h3 class="text-background-900 text-sm text-balance">
          {{ props.cardFood.food?.name }}
        </h3>
        <h4 class="text-secondary-100 text-xs">
          {{ daysFromToday(new Date(props.cardFood.lastEaten || "")) }}
        </h4>
      </div>
      <button
        class="flex flex-col justify-center items-center bg-background-900 rounded-full size-7 shrink-0"
      >
        <IconPlus class="size-6 text-primary-900" />
      </button>
    </div>
    <div
      v-else
      class="bottom-0 absolute flex flex-row justify-between items-center bg-background-900 p-2 w-full text-secondary-900"
    >
      <div class="space-y-1 w-full">
        <h3 class="text-sm text-balance">
          {{ props.cardFood.food?.name }}
        </h3>
        <h4 class="text-primary-900 text-xs">
          {{ props.cardFood.count }} fois
        </h4>
      </div>
      <button
        class="flex flex-col justify-center items-center bg-primary-900 rounded-full size-7 shrink-0"
      >
        <IconPlus class="size-6 text-background-900" />
      </button>
    </div>
  </div>
</template>
