<script setup lang="ts">
// define props types
interface Props {
  food: Food | undefined;
  class: string;
}

// register props
const props = defineProps<Props>();

// in case an error happens
const { cardError } = useEatFood();
</script>

<template>
  <div
    class="relative shadow-[0_2px_4px_0] shadow-secondary-900/50 rounded-xl overflow-hidden"
    :class="props.class"
  >
    <h3 class="top-2 absolute w-full text-red-700 text-center">
      {{ cardError }}
    </h3>
    <NuxtImg
      :src="props.food?.image"
      :alt="props.food?.name"
      class="w-full h-full object-cover"
    />
    <slot name="overlay" />
  </div>
</template>
