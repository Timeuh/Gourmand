<script setup lang="ts">
// if the filter panel should be visible
const showFilters = ref<boolean>(false);

// display or hide the filter panel
function toggleFilters() {
  showFilters.value = !showFilters.value;
}
</script>

<template>
  <div class="ps-4">
    <button
      @click="toggleFilters"
      class="xl:hidden flex flex-row justify-center items-center bg-background-900 shadow-[0_0_2px_0] shadow-secondary-900/50 p-2 rounded-md size-10"
    >
      <IconFilter class="size-5 text-secondary-900" />
    </button>
    <div
      class="top-12 left-0 z-40 absolute px-2 transition duration-500 ease-in-out"
      :class="showFilters ? 'translate-x-0' : 'translate-x-[120%]'"
    >
      <FoodsAdvancedFilters />
    </div>
  </div>
</template>
