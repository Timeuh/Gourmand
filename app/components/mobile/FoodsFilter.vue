<script setup lang="ts">
// if the filter panel should be visible
const showFilters = ref<boolean>(false);

// display or hide the filter panel
function toggleFilters() {
  showFilters.value = !showFilters.value;
}
</script>

<template>
  <div>
    <button
      @click="toggleFilters"
      class="relative flex flex-row justify-center items-center bg-background-900 shadow-[0_0_2px_0] shadow-secondary-900/50 p-2 rounded-md size-10"
    >
      <IconFilter class="size-5 text-secondary-900" />
    </button>
    <div
      class="top-[18vh] left-0 z-40 absolute px-6 w-full transition duration-500 ease-in-out"
      :class="showFilters ? 'translate-x-0' : 'translate-x-full'"
    >
      <FoodsAdvancedFilters />
    </div>
  </div>
</template>
