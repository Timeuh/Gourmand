<script setup lang="ts">
useHead({
  title: "Gourmand - Plats",
});
definePageMeta({
  middleware: ["authenticated"],
});

// fetch all foods
const { data } = useFetch<ApiCollection<FullFood>>(
  "/api/foods?fullContent=true",
  { key: "FoodPage" },
);
</script>

<template>
  <div
    class="space-y-6 bg-background-500 xl:p-12 px-6 py-8 xl:pt-4 pb-[12vh] xl:pb-0 w-full xl:w-5/6 overflow-hidden select-none"
  >
    <ModalFoodRecipe />
    <section id="first-row" class="flex flex-row justify-between w-full">
      <div class="w-2/3">
        <h1 class="font-bold text-secondary-900 text-2xl">
          🍴 Liste des plats
        </h1>
        <h2 class="text-md text-secondary-500">
          {{ formatDate(new Date()) }}
        </h2>
      </div>
      <div
        class="hidden xl:flex flex-row justify-end items-center space-x-4 w-1/3"
      >
        <ButtonAdd />
      </div>
      <div class="xl:hidden h-max">
        <ButtonMobileAdd />
      </div>
    </section>
    <section id="second-row">
      <div class="gap-3 grid grid-cols-2 w-full">
        <CardFood v-for="food in data?.items" :card-food="food" class="h-48" />
      </div>
    </section>
  </div>
</template>
