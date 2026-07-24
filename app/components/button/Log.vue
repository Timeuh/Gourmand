<script setup lang="ts">
// if the log modal is displayed or not
const showModal = useState<boolean>("LogModal", () => false);

// show or hide the modal depending on its state
function triggerModal() {
  showModal.value = !showModal.value;
}
</script>

<template>
  <button
    @click="triggerModal"
    class="flex flex-row justify-center items-center space-x-2 bg-primary-100 hover:bg-secondary-100 shadow-[0_1px_2px_0] shadow-secondary-900/25 rounded-lg w-1/2 h-10 text-primary-900 hover:text-secondary-900 xl:text-lg transition-color duration-300 ease-in-out cursor-pointer"
  >
    <IconPlus class="size-5 xl:size-6" />
    <h3>Log un plat</h3>
  </button>
</template>
