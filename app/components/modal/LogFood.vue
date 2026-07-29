<script setup lang="ts">
// get modal utils from composable
const { showModal, closeModal } = useLogModal();

// fetch all foods
const { data } = useFetch<ApiCollection<OldestFood>>(
  "/api/foods?lastEaten=true",
  { key: "LogModal" },
);

// search input value
const search = ref<string>("");

// foods filtered by search value
const foodsToDisplay: ComputedRef<OldestFood[] | undefined> = computed(() => {
  return data.value?.items.filter((food) =>
    // compare food name with search string
    food.food?.name.toLowerCase().includes(search.value.toLowerCase()),
  );
});

// clear the search string value
function clearSearch() {
  search.value = "";
}

// clear search and close modal
function exitModal() {
  closeModal();
  clearSearch();
}
</script>

<template>
  <section
    :class="showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    class="z-20 fixed inset-0 flex flex-col justify-center items-center bg-black/50 backdrop-blur-xs w-full h-screen transition duration-500 ease-in-out"
  >
    <div
      class="space-y-3 bg-background-500 p-4 rounded-xl w-4/5 xl:w-1/3 h-4/5"
    >
      <div class="flex flex-row justify-between items-center w-full">
        <h1 class="font-bold text-primary-900 text-xl">Log un plat</h1>
        <button @click="exitModal" class="cursor-pointer">
          <IconCross class="size-6 text-primary-900" />
        </button>
      </div>
      <div
        class="flex flex-row justify-between items-center bg-background-900 shadow-[0_0_2px_0] shadow-secondary-900/50 p-2 rounded-md focus-within:outline focus-within:outline-primary-900 w-full"
      >
        <div class="flex flex-row items-center space-x-1 xl:w-full">
          <IconSearch class="size-5 text-secondary-500" />
          <input
            type="text"
            v-model="search"
            placeholder="Lasagnes"
            class="outline-none xl:w-full text-secondary-900 placeholder:text-secondary-100"
          />
        </div>
        <button
          v-if="search !== ''"
          @click="clearSearch"
          class="cursor-pointer"
        >
          <IconCross class="size-4 text-secondary-900" />
        </button>
      </div>
      <h2
        v-if="data?.items.length == 0"
        class="font-bold text-secondary-900 text-center"
      >
        Ajoutez une recette pour la voir ici
      </h2>
      <div
        class="content-start gap-3 grid grid-cols-2 xl:grid-cols-3 w-full h-[86%] overflow-auto"
      >
        <CardLastEaten
          v-for="food in foodsToDisplay"
          :key="food.food?.id"
          :card-food="food"
          class="h-40"
        />
      </div>
    </div>
  </section>
</template>
