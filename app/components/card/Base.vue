<script setup lang="ts">
// define props types
interface Props {
  food: Food | undefined;
  class: string;
}

// register props
const props = defineProps<Props>();

const hasImage: boolean = props.food?.image != "";
</script>

<template>
  <div
    class="relative shadow-[0_2px_4px_0] shadow-secondary-900/50 rounded-xl overflow-hidden"
    :class="[
      props.class,
      hasImage ? '' : 'border-2 border-dashed border-secondary-900',
    ]"
  >
    <NuxtImg
      v-if="hasImage"
      :src="props.food?.image"
      :alt="props.food?.name"
      class="w-full h-full object-cover"
    />
    <slot name="overlay" />
  </div>
</template>
