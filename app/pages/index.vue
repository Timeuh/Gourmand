<script lang="ts" setup>
// set page title
useHead({
  title: "Gourmand",
});
// prevent access to this page if the user is not logged in
definePageMeta({
  middleware: ["authenticated", "account-not-deleted"],
});

// get the user session
const { user } = useUserSession();

// fetch home data
const { data } = useFetch<HomeData>("/api/home", { key: "home" });
</script>

<template>
  <div
    class="space-y-6 bg-background-500 xl:p-12 px-6 py-8 xl:pt-4 xl:pb-0 w-full xl:w-5/6 overflow-hidden select-none"
  >
    <ModalLogFood />
    <ModalFoodRecipe />
    <section
      id="first-row"
      class="xl:flex flex-row justify-between space-y-6 xl:space-y-0 w-full"
    >
      <div>
        <h1 class="font-bold text-secondary-900 text-xl">
          Bonjour {{ user?.name }} 👋
        </h1>
        <h2 class="text-md text-secondary-500">
          {{ formatDate(new Date()) }}
        </h2>
      </div>
      <div
        class="flex flex-row justify-between items-center space-x-4 w-full xl:w-1/3"
      >
        <ButtonLog />
        <ButtonAdd />
      </div>
    </section>
    <section
      id="second-row"
      class="xl:flex flex-row justify-between items-center space-y-6 xl:space-y-0 w-full xl:h-1/6"
    >
      <MonthVariety
        :this-month="data?.foodsOfCurrentMonth"
        :last-month="data?.foodsOfPreviousMonth"
        :objective="user?.month_objective"
      />
      <FavoriteFoods :foods="data?.favoriteFoods" />
    </section>
    <section
      id="third-row"
      class="xl:flex flex-row justify-between space-y-6 w-full xl:h-[50%]"
    >
      <div
        class="xl:flex flex-col xl:justify-between space-y-6 xl:w-3/5 h-full"
      >
        <FoodSuggestions :foods="data?.oldestFoods" />
        <MobileFoodThisWeek :foods="data?.groupedFoodsOfThisWeek" />
        <FoodThisWeek :foods="data?.groupedFoodsOfThisWeek" />
      </div>
      <MonthMostEaten :foods="data?.mostEatenFoods" />
    </section>
    <section id="last-row" class="xl:h-[19%]">
      <MobileLastEaten :foods="data?.foodsOfThisWeek" />
      <LastEaten :foods="data?.foodsOfThisWeek" />
    </section>
  </div>
</template>
