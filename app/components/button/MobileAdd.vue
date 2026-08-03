<script setup lang="ts">
// get modal utils from composable
const { openModal } = useRecipeModal();
</script>

<template>
  <button
    @click="openModal"
    class="flex flex-row justify-center items-center bg-primary-900 shadow-[0_1px_2px_0] shadow-secondary-900/50 p-2 rounded-lg size-12 text-background-900"
  >
    <IconPot class="size-6" />
  </button>
</template>
