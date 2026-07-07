<script lang="ts" setup>
// define component props
interface Props {
  height: string;
  percentage: number;
}

// init props
const props = defineProps<Props>();
</script>

<template>
  <div class="relative w-full" :class="height">
    <div class="bg-primary-100 rounded-full w-full h-full" />
    <div
      class="top-0 left-0 absolute bg-primary-900 rounded-full h-full"
      :style="{ width: `${props.percentage}%` }"
    />
  </div>
</template>
