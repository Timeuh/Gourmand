<script lang="ts" setup>
useHead({
  title: "Gourmand - Paramètres",
});
</script>

<template>
  <div
    class="space-y-6 bg-background-500 mb-20 xl:mb-0 p-8 w-full xl:w-5/6 min-h-screen select-none"
  >
    <section id="first-row">
      <h1 class="font-bold text-secondary-900 text-xl">⚙️ Paramètres</h1>
      <h2 class="text-md text-secondary-500">
        {{ formatDate(new Date()) }}
      </h2>
    </section>
    <UserAccount />
    <UserObjective />
    <UserTheme />
  </div>
</template>
