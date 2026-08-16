<script setup lang="ts">
useHead({
  title: "Gourmand - Calendrier",
});
definePageMeta({
  middleware: ["authenticated", "account-not-deleted"],
});

// get calendar utils from composable
const { resetSelectedDate, hideFoodsPanel } = useCalendarUtils();

// reset selected date and hide foods panel when leaving the page
onBeforeRouteLeave(() => {
  setTimeout(() => {
    resetSelectedDate();
    hideFoodsPanel();
  }, 300);
});
</script>

<template>
  <div
    class="flex flex-col space-y-6 bg-background-500 p-8 w-full xl:w-5/6 h-screen select-none"
  >
    <ModalLogFood />
    <ModalDeleteCalendar />
    <section
      id="first-row"
      class="flex flex-row justify-between items-center w-full"
    >
      <div>
        <h1 class="font-bold text-secondary-900 text-xl">🗓️ Calendrier</h1>
        <h2 class="text-md text-secondary-500">
          {{ formatDate(new Date()) }}
        </h2>
      </div>
      <ButtonChangeMonth />
    </section>
    <section id="second-row" class="flex flex-col flex-1 min-h-0">
      <CalendarView />
      <MobileCalendarView />
      <MobileCalendarFood />
    </section>
  </div>
</template>
