<script setup lang="ts">
// today's date
const today = new Date();

// current month date
const currentMonth = ref<Date>(
  new Date(today.getFullYear(), today.getMonth(), 1),
);

// format current month name
const monthName = computed(() => {
  return currentMonth.value.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });
});

/**
 * change current month
 *
 * @param offset {number} -1 for previous month, 1 for next month
 */
function changeMonth(offset: number) {
  const newMonth = new Date(
    currentMonth.value.getFullYear(),
    currentMonth.value.getMonth() + offset,
    1,
  );
  currentMonth.value = newMonth;
}
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
