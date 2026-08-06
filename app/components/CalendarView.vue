<script setup lang="ts">
// get calendar utils
const { desktopWeekDays, calendarDays } = useCalendarUtils();

// today's date
const today = new Date();

// get today's index in the weekdays array
const todayIndex = (today.getDay() + 6) % 7;

/**
 * Check if current index is a weekend day
 *
 * @param index {number} current day's index
 */
function isweekend(index: number) {
  return (
    index == 6 || index == 5 || (index - 5) % 7 == 0 || (index - 6) % 7 == 0
  );
}
</script>

<template>
  <div
    class="hidden xl:block bg-background-900 shadow-[0_0_2px_0] shadow-secondary-900/50 p-4 rounded-xl w-full h-[85vh]"
  >
    <div class="gap-3 grid grid-cols-7 w-full h-10">
      <h2
        v-for="(day, index) in desktopWeekDays"
        :class="
          index == todayIndex
            ? 'text-primary-900 font-bold'
            : 'text-secondary-500'
        "
        class="justify-self-center"
      >
        {{ day }}
      </h2>
    </div>
    <div class="gap-3 grid grid-cols-7 w-full h-[95%]">
      <div
        v-for="(day, index) in calendarDays"
        :class="isweekend(index) ? 'bg-background-500' : ''"
        class="justify-self-center w-full h-full text-secondary-900"
      >
        {{ day?.day }}
      </div>
    </div>
  </div>
</template>
