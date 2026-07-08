<script lang="ts" setup>
// set page title
useHead({
  title: "Gourmand",
});
// prevent access to this page if the user is not logged in
definePageMeta({
  middleware: ["authenticated"],
});

// get the user session
const { user } = useUserSession();

// fetch home data
const { data } = useFetch<HomeData>("/api/home", {
  query: {
    userId: user.value?.id,
  },
});
</script>

<template>
  <div class="space-y-6 bg-background-500 xl:p-12 px-6 py-8 w-full h-screen">
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
      class="xl:flex flex-row justify-between items-center xl:space-x-20 space-y-6 xl:space-y-0 xl:h-[15vh]"
    >
      <MonthVariety
        :this-month="data?.foodsOfCurrentMonth"
        :last-month="data?.foodsOfPreviousMonth"
      />
      <FavoriteFoods :foods="data?.favoriteFoods" />
    </section>
  </div>
</template>
