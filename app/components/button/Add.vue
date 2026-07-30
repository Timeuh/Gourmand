<script setup lang="ts">
// get modal utils from composable
const { openModal } = useRecipeModal();
</script>

<template>
  <button
    @click="openModal"
    class="flex flex-row justify-center items-center space-x-2 bg-primary-900 hover:bg-secondary-900 shadow-[0_1px_2px_0] shadow-secondary-900/50 rounded-lg w-1/2 h-10 text-background-900 xl:text-lg transition-colors duration-300 ease-in-out cursor-pointer"
  >
    <IconPot class="size-5 xl:size-6" />
    <h3 class="text-sm xl:text-lg">Ajouter une recette</h3>
  </button>
</template>
