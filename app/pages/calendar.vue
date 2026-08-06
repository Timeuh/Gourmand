<script setup lang="ts">
useHead({
  title: "Gourmand - Calendrier",
});
definePageMeta({
  middleware: ["authenticated"],
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
  <div class="space-y-6 bg-background-500 p-8 w-full xl:w-5/6 h-screen">
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
    <section id="second-row">
      <CalendarView />
      <MobileCalendarView />
      <MobileCalendarFood />
    </section>
  </div>
</template>
