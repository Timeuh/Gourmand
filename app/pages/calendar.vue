<script setup lang="ts">
useHead({
  title: "Gourmand - Calendrier",
});
definePageMeta({
  middleware: ["authenticated"],
});
</script>

<template>
  <div class="space-y-6 bg-background-500 p-8 w-full xl:w-5/6 h-screen">
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
      <MobileCalendarView />
    </section>
  </div>
</template>
