<script setup lang="ts">
// get calendar utils
const { desktopWeekDays, calendarDays, isDate, todayDate } = useCalendarUtils();

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
    <div class="grid grid-cols-7 w-full h-10">
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
    <div
      class="grid grid-cols-7 border-secondary-100 border-t border-l rounded-md w-full h-[95%] overflow-hidden"
    >
      <div
        v-for="(day, index) in calendarDays"
        :class="[
          isweekend(index) ? 'bg-background-500' : '',
          isDate(day, todayDate) ? 'bg-primary-100' : '',
        ]"
        class="justify-self-center p-2 border-secondary-100 border-r border-b w-full h-full text-secondary-900"
      >
        <div class="flex flex-row justify-between items-center w-full">
          <button
            v-if="day !== null"
            class="p-1 border border-secondary-500 border-dotted rounded-md"
          >
            <IconPlus class="size-5 text-secondary-500" />
          </button>
          <h3
            :class="[
              'text-xl font-bold',
              isDate(day, todayDate)
                ? 'text-primary-900'
                : 'text-secondary-900',
            ]"
          >
            {{ day?.day }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
