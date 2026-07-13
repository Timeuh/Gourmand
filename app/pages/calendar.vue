<script setup lang="ts">
useHead({
  title: "Gourmand - Calendrier",
});
definePageMeta({
  middleware: ["authenticated"],
});
</script>

<template>
  <div class="bg-background-500 p-8 w-full h-screen">
    <h1>Calendrier</h1>
  </div>
</template>
