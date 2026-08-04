<script setup lang="ts">
useHead({
  title: "Gourmand - Calendrier",
});
definePageMeta({
  middleware: ["authenticated"],
});
</script>

<template>
  <div class="bg-background-500 p-8 w-full xl:w-5/6 h-screen">
    <section
      id="first-row"
      class="xl:flex flex-row justify-between space-y-6 xl:space-y-0 w-full"
    >
      <div>
        <h1 class="font-bold text-secondary-900 text-xl">🗓️ Calendrier</h1>
        <h2 class="text-md text-secondary-500">
          {{ formatDate(new Date()) }}
        </h2>
      </div>
    </section>
  </div>
</template>
