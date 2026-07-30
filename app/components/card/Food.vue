<script setup lang="ts">
// define props types
interface Props {
  cardFood: FullFood;
  class: string;
}

// register props
const props = defineProps<Props>();
</script>

<template>
  <CardBase :class="props.class" :food="props.cardFood">
    <template #overlay>
      <div
        class="bottom-0 absolute flex flex-row justify-between items-center bg-linear-to-t from-black via-60% via-black/80 to-black/20 backdrop-blur-xs p-2 w-full"
      >
        <div class="space-y-1 w-full">
          <h3 class="text-background-900 text-sm text-balance">
            {{ props.cardFood.name }}
          </h3>
        </div>
        <button
          class="flex flex-col justify-center items-center size-7 cursor-pointer shrink-0"
        >
          <IconEdit class="size-5 text-background-900" />
        </button>
      </div>
    </template>
  </CardBase>
</template>
