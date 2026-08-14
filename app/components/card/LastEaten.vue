<script setup lang="ts">
// define props types
interface Props {
  cardFood: OldestFood;
  class: string;
}

// register props
const props = defineProps<Props>();

// get the function to eat a food
const { eatFood } = useEatFood();

// test if the food has been eaten
const lastEaten = computed(() => {
  // if never eaten
  if (props.cardFood.lastEaten == null) {
    return "Pas encore mangé";
  }

  // get last eaten text
  return daysFromToday(new Date(props.cardFood.lastEaten));
});
</script>

<template>
  <CardBase :class="props.class" :food="props.cardFood.food">
    <template #overlay>
      <div
        class="bottom-0 absolute flex flex-row justify-between items-center bg-linear-to-t from-secondary-900 via-60% via-secondary-900/80 to-secondary-900/20 backdrop-blur-xs p-2 w-full"
      >
        <div class="space-y-1 w-full">
          <h3 class="font-bold text-secondary-100 text-sm text-balance">
            {{ props.cardFood.food?.name }}
          </h3>
          <h4 class="text-secondary-100 text-xs">
            {{ lastEaten }}
          </h4>
        </div>
        <button
          @click="eatFood(props.cardFood.food?.id)"
          class="flex flex-col justify-center items-center bg-background-900 rounded-full size-7 cursor-pointer shrink-0"
        >
          <IconPlus class="size-6 text-primary-900" />
        </button>
      </div>
    </template>
  </CardBase>
</template>
