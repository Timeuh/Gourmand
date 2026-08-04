<script setup lang="ts">
// today's date
const today = new Date();

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

// get this year and month
const year = today.getFullYear();
const month = today.getMonth();

// number of days in the month
const daysInMonth = new Date(year, month + 1, 0).getDate();

// first days of the month if the month doesn't start on a monday
const firstWeekDay = (new Date(year, month, 1).getDay() + 6) % 7;

// days of the month with empty cases for the first week if the 1st isn't monday
const calendarDays = [
  ...Array.from({ length: firstWeekDay }, () => null),
  ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
];
</script>

<template>
  <div class="w-full">
    <div
      class="flex flex-row items-center bg-primary-900 p-2 rounded-md w-full h-12 text-background-900"
    >
      <h2 class="ps-4 font-bold text-xl">{{ formatedDate }}</h2>
    </div>
    <div class="space-y-2 bg-background-900 p-2 rounded-b-md">
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
          class="justify-self-center font-bold text-lg"
        >
          <h4
            v-if="day == today.getDate()"
            class="flex justify-center items-center bg-primary-900 rounded-full size-7 text-background-900"
          >
            {{ day }}
          </h4>
          <h4 v-else class="text-secondary-900">{{ day }}</h4>
        </button>
      </div>
    </div>
  </div>
</template>
