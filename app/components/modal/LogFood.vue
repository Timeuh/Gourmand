<script setup lang="ts">
// get modal utils from composable
const { showModal, closeModal } = useLogModal();

// fetch all foods
const { data } = useFetch<ApiCollection<OldestFood>>(
  "/api/foods?lastEaten=true",
  { key: "LogModal" },
);
</script>

<template>
  <section
    :class="showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    class="z-20 fixed inset-0 flex flex-col justify-center items-center bg-black/50 backdrop-blur-xs w-full h-screen transition duration-500 ease-in-out"
  >
    <div class="space-y-2 bg-background-500 p-4 rounded-xl w-4/5 h-4/5">
      <div class="flex flex-row justify-between items-center w-full">
        <h1 class="font-bold text-primary-900 text-xl">Log un plat</h1>
        <button @click="closeModal" class="cursor-pointer">
          <IconCross class="size-6 text-primary-900" />
        </button>
      </div>
      <div class="gap-3 grid grid-cols-2 w-full h-[95%] overflow-auto">
        <CardLastEaten
          v-for="food in data?.items"
          :key="food.food?.id"
          :card-food="food"
          class="h-40"
        />
      </div>
    </div>
  </section>
</template>
