<script setup lang="ts">
// define props types
interface Props {
  foods: ThisWeekFood[] | undefined;
}

// register props
const props = defineProps<Props>();

// carousel page size
const cardsPerPage = 4;

// start with page 1 of course
const currentPage = ref<number>(1);

// calculate max page
const maxPage = computed(() => {
  if (!props.foods) return 1;

  return Math.ceil(props.foods.length / cardsPerPage);
});

// display next page
const next = async () => {
  currentPage.value++;
};

// display previous page
const prev = async () => {
  currentPage.value--;
};

// card width and spacing for carousel animation
const cardWidth = 208 + 20;
</script>

<template>
  <div class="hidden xl:block w-full">
    <div class="flex flex-row justify-between items-center w-full">
      <h2 class="font-bold text-secondary-900 text-lg">🗓️ Cette semaine</h2>
      <NuxtLink
        to="/calendar"
        class="flex flex-row items-center text-primary-900"
      >
        <h3>Calendrier</h3>
        <IconChevronRight class="size-5" />
      </NuxtLink>
    </div>
    <div class="relative w-full">
      <button
        v-if="maxPage > 1 && currentPage > 1"
        @click="prev"
        class="top-1/2 -left-5 z-10 absolute bg-background-900 shadow-[0_0_2px_0] shadow-secondary-900/50 p-2 rounded-full -translate-y-1/2 cursor-pointer"
      >
        <IconChevronLeft class="size-5" />
      </button>
      <div class="p-1 w-full overflow-hidden">
        <div
          ref="carouselRef"
          class="flex flex-row space-x-5 py-1 w-full transition-transform duration-700 ease-out"
          :style="{
            transform: `translateX(-${(currentPage - 1) * cardsPerPage * cardWidth}px)`,
          }"
        >
          <CardTimesEaten
            v-for="food in props.foods"
            :key="food.food?.id"
            :card-food="food"
            class="w-52 h-48 shrink-0"
          />
          <CardPlaceHolder
            v-if="props.foods?.length == 0"
            class="w-52 h-48"
            message="Ajoutez un plat pour le voir ici"
          />
        </div>
      </div>
      <button
        v-if="maxPage > 1 && currentPage < maxPage"
        @click="next"
        class="top-1/2 -right-5 z-10 absolute bg-background-900 shadow-[0_0_2px_0] shadow-secondary-900/50 p-2 rounded-full -translate-y-1/2 cursor-pointer"
      >
        <IconChevronRight class="size-5" />
      </button>
    </div>
  </div>
</template>
