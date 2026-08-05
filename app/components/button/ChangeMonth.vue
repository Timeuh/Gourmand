<script setup lang="ts">
// get current month utils
const { currentMonth, changeMonth } = useCalendarUtils();

// format current month name
const monthName = computed(() => {
  return currentMonth.value.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });
});
</script>

<template>
  <div
    class="relative flex flex-row justify-center items-center space-x-2 bg-background-900 shadow-[0_0_1px_0] shadow-secondary-900/50 p-2 rounded-md min-w-[45vw] text-secondary-900"
  >
    <button @click="changeMonth(-1)" class="left-2 absolute">
      <IconChevronLeft class="size-5" />
    </button>
    <h2>{{ monthName }}</h2>
    <button @click="changeMonth(1)" class="right-2 absolute">
      <IconChevronRight class="size-5" />
    </button>
  </div>
</template>
