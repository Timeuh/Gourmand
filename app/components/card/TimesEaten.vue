<script setup lang="ts">
// define props types
interface Props {
  cardFood: ThisWeekFood;
  class: string;
}

// register props
const props = defineProps<Props>();

// get the function to eat a food
const { eatFood } = useEatFood();
</script>

<template>
  <CardBase :class="props.class" :food="props.cardFood.food">
    <template #overlay>
      <div
        class="bottom-0 absolute flex flex-row justify-between items-center bg-background-900 p-2 w-full text-secondary-900"
      >
        <div class="space-y-1 w-full">
          <h3 class="text-sm text-balance">
            {{ props.cardFood.food?.name }}
          </h3>
          <h4 class="font-bold text-primary-900 text-xs">
            {{ props.cardFood.count }} fois
          </h4>
        </div>
        <button
          @click="eatFood(props.cardFood.food?.id)"
          class="flex flex-col justify-center items-center bg-primary-900 rounded-full size-7 cursor-pointer shrink-0"
        >
          <IconPlus class="size-6 text-background-900" />
        </button>
      </div>
    </template>
  </CardBase>
</template>
