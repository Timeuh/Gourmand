<script setup lang="ts">
// get calendar utils from composable
const { showFoods, hideFoodsPanel, formatedSelectedDate, selectedDate, data } =
  useCalendarUtils();

// get log modal utils from composable
const { openModal } = useLogModal();

// get delete calendar modal utils from composable
const { openModal: openDeleteCalendarModal } = useDeleteCalendar();

// selected date, formated with desired format
const formatedDate = computed(() => {
  return new Date(formatedSelectedDate.value).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
});
</script>

<template>
  <div
    :class="showFoods ? 'translate-y-0' : 'translate-y-[90%]'"
    class="bottom-20 left-0 fixed bg-background-900 shadow-[0_0_2px_0] shadow-secondary-900/25 rounded-md w-full h-fit transition duration-300 ease-in-out"
  >
    <div class="flex flex-row justify-center items-center pt-2 w-full">
      <button
        class="bg-secondary-900 rounded-full w-1/3 h-1.5"
        @click="hideFoodsPanel"
      />
    </div>
    <div class="pb-3">
      <div class="p-3">
        <div class="bg-background-500 p-1 rounded-md w-full text-secondary-900">
          <h3 class="text-lg text-center">{{ formatedDate }}</h3>
        </div>
      </div>
      <div class="space-y-3 p-3 pt-2 w-full h-[15vh] overflow-auto">
        <div
          v-if="data?.items.length == 0"
          class="flex flex-row justify-center items-center bg-background-500 p-2 rounded-md w-full h-18"
        >
          <h3 class="text-secondary-900 text-lg">
            Aucun plat mangé à cette date
          </h3>
        </div>
        <div
          v-for="calendar in data?.items"
          :key="calendar.id"
          class="flex flex-row justify-between items-center bg-background-900 shadow-[0_0_3px_0] shadow-secondary-900/50 p-2 rounded-md w-full"
        >
          <div class="flex flex-row items-center space-x-4">
            <NuxtImg
              :src="calendar.food.image"
              :alt="calendar.food.name"
              class="rounded-md size-16 object-cover"
            />
            <h3 class="font-bold text-secondary-900 text-xl">
              {{ calendar.food.name }}
            </h3>
          </div>
          <button
            class="justify-end"
            @click="openDeleteCalendarModal(calendar.id)"
          >
            <IconTrash class="size-7 text-red-500" />
          </button>
        </div>
      </div>
      <div class="p-3">
        <button
          class="flex flex-row justify-center items-center space-x-4 bg-background-900 p-2 border-2 border-secondary-900/50 border-dotted rounded-md w-full h-18"
          @click="
            openModal(
              new Date(
                selectedDate.year,
                selectedDate.month - 1,
                selectedDate.day,
                12,
              ),
            )
          "
        >
          <IconPlus class="size-7 text-secondary-900" />
        </button>
      </div>
    </div>
  </div>
</template>
