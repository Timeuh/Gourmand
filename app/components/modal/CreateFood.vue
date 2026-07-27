<script setup lang="ts">
// get modal utils from composable
const { showModal, closeModal } = useRecipeModal();
</script>

<template>
  <section
    :class="showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    class="z-20 fixed inset-0 flex flex-col justify-center items-center bg-black/50 backdrop-blur-xs w-full h-screen transition duration-500 ease-in-out"
  >
    <div
      class="space-y-3 bg-background-500 p-4 rounded-xl w-4/5 xl:w-1/3 h-4/5"
    >
      <div class="flex flex-row justify-between items-center w-full">
        <h1 class="font-bold text-primary-900 text-xl">Ajouter une recette</h1>
        <button @click="closeModal" class="cursor-pointer">
          <IconCross class="size-6 text-primary-900" />
        </button>
      </div>
    </div>
  </section>
</template>
