<script setup lang="ts">
// get modal utils from composable
const { showModal, closeModal, deleteCalendarFromDatabase } =
  useDeleteCalendar();

// get calendar utils from composable
const { refreshCalendarDay, refreshCalendarMonth } = useCalendarUtils();

// get the function to refresh home data
const { refreshHome } = useEatFood();

// delete the calendar entry
async function deleteCalendar() {
  await deleteCalendarFromDatabase();
  refreshCalendarDay();
  refreshCalendarMonth();
  refreshHome();
  closeModal();
}
</script>

<template>
  <section
    :class="showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    class="z-20 fixed inset-0 flex flex-col justify-center items-center bg-black/50 backdrop-blur-xs w-full h-screen transition duration-500 ease-in-out"
  >
    <div
      class="flex flex-col items-center space-y-4 bg-background-500 p-4 rounded-xl w-4/5 xl:w-1/3"
    >
      <div class="flex flex-row justify-between items-center w-full">
        <h1 class="font-bold text-primary-900 text-xl">
          Supprimer l'entrée du calendrier
        </h1>
        <button @click="closeModal" class="cursor-pointer">
          <IconCross class="size-6 text-primary-900" />
        </button>
      </div>
      <h2 class="font-bold text-secondary-900 text-xl text-center">
        Vous êtes sur le point de supprimer ce plat de votre calendrier
      </h2>
      <button
        type="button"
        @click="deleteCalendar"
        class="bg-primary-900 p-2 rounded-md text-background-900"
      >
        Supprimer cette entrée
      </button>
    </div>
  </section>
</template>
