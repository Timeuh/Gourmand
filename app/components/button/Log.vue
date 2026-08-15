<script setup lang="ts">
// get modal utils from composable
const { openModal } = useLogModal();

// set today's date to 12:00:00 to avoid timezone issues when logging a food
const today = new Date();
today.setHours(12, 0, 0, 0);
</script>

<template>
  <button
    @click="openModal(today)"
    class="flex flex-row justify-center items-center space-x-2 bg-secondary-100 hover:bg-secondary-900 shadow-[0_1px_2px_0] shadow-secondary-900/25 rounded-lg outline-none w-1/2 h-10 text-secondary-900 hover:text-secondary-100 xl:text-lg transition-color duration-300 ease-in-out cursor-pointer"
  >
    <IconPlus class="size-5 xl:size-6" />
    <h3>Log un plat</h3>
  </button>
</template>
