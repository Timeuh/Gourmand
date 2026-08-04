<script setup lang="ts">
// get current month utils
const { currentMonth } = useCurrentMonth();

// today's date
const today = new Date();

// today as a CalendarDay object
const todayDate: CalendarDay = {
  day: today.getDate(),
  month: today.getMonth(),
  year: today.getFullYear(),
};

// today's date, formated with desired format
const formatedDate = computed(() => {
  return today.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
});

// days of the week
const weekDays: string[] = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

// get today's index in the weekdays array
const todayIndex = (today.getDay() + 6) % 7;

// get current month date's year and month
const year = computed(() => currentMonth.value.getFullYear());
const month = computed(() => currentMonth.value.getMonth());

// number of days in the month
const daysInMonth = computed(() => {
  return new Date(year.value, month.value + 1, 0).getDate();
});

// first days of the month if the month doesn't start on a monday
const firstWeekDay = computed(() => {
  return (new Date(year.value, month.value, 1).getDay() + 6) % 7;
});

// days of the month with empty cases for the first week if the 1st isn't monday
const calendarDays: ComputedRef<Array<CalendarDay | null>> = computed(() => {
  return [
    ...Array.from({ length: firstWeekDay.value }, () => null),
    ...Array.from({ length: daysInMonth.value }, (_, index) => {
      return {
        day: index + 1,
        month: month.value,
        year: year.value,
      };
    }),
  ];
});

/**
 * Check if the given day is the same as the compareTo day
 *
 * @param day {CalendarDay | null} CalendarDay of the given day to check
 * @param compareTo {CalendarDay} CalendarDay to compare with
 */
function isDate(day: CalendarDay | null, compareTo: CalendarDay): boolean {
  if (!day) return false;

  return (
    day.day === compareTo.day &&
    day.month === compareTo.month &&
    day.year === compareTo.year
  );
}

// current selected date
const selectedDate = ref<CalendarDay>({
  day: today.getDate(),
  month: today.getMonth(),
  year: today.getFullYear(),
});

// on click on another date, update the selected date
function selectDate(day: CalendarDay | null) {
  if (!day) return;

  selectedDate.value = day;
}
</script>

<template>
  <div class="w-full">
    <div
      class="flex flex-row items-center bg-primary-900 p-2 rounded-md w-full h-12 text-background-900"
    >
      <h2 class="ps-4 font-bold text-xl">{{ formatedDate }}</h2>
    </div>
    <div class="space-y-2 bg-background-900 p-2 rounded-b-md min-h-[34vh]">
      <div class="flex flex-row justify-between items-center w-full text-lg">
        <h3
          v-for="(day, index) in weekDays"
          :key="index"
          :class="
            index == todayIndex
              ? 'text-primary-900 font-bold'
              : 'text-secondary-500'
          "
        >
          {{ day }}
        </h3>
      </div>
      <div class="gap-3 grid grid-cols-7">
        <button
          v-for="(day, index) in calendarDays"
          :key="index"
          class="justify-self-center font-bold text-lg transition duration-300 ease-in-out"
          @click="day !== null && selectDate(day)"
        >
          <h4
            :class="[
              'flex items-center justify-center size-8 rounded-full font-bold text-lg transition-all duration-300 ease-in-out',
              isDate(day, selectedDate)
                ? 'bg-primary-900 text-background-900'
                : isDate(day, todayDate)
                  ? 'text-primary-500'
                  : 'text-secondary-900',
            ]"
          >
            {{ day?.day }}
          </h4>
        </button>
      </div>
    </div>
  </div>
</template>
