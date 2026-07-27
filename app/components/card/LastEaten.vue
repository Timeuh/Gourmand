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
  // in case it wasnt eaten before
  if (props.cardFood.lastEaten == null) return "Pas encore mangé";

  // in case it has been eaten today
  if (
    new Date().getDate() == new Date(props.cardFood.lastEaten || "").getDate()
  )
    return "Aujourd'hui";

  // other cases
  return daysFromToday(new Date(props.cardFood.lastEaten || ""));
});
</script>

<template>
  <CardBase :class="props.class" :food="props.cardFood.food">
    <template #overlay>
      <div
        class="bottom-0 absolute flex flex-row justify-between items-center bg-linear-to-t from-black via-60% via-black/80 to-black/20 backdrop-blur-xs p-2 w-full"
      >
        <div class="space-y-1 w-full">
          <h3 class="text-background-900 text-sm text-balance">
            {{ props.cardFood.food?.name }}
          </h3>
          <h4 class="font-bold text-secondary-100 text-xs">
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
