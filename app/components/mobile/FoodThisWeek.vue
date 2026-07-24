<script setup lang="ts">
// define props types
interface Props {
  foods: ThisWeekFood[] | undefined;
}

// register props
const props = defineProps<Props>();
</script>

<template>
  <div class="xl:hidden space-y-2 w-full">
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
    <div class="pb-2 w-full overflow-x-scroll">
      <div class="flex flex-row items-center space-x-4 w-max">
        <CardTimesEaten
          v-for="food in props.foods"
          :key="food.food?.id"
          :card-food="food"
          class="size-44"
        />
        <CardPlaceHolder
          v-if="props.foods?.length == 0"
          class="size-44"
          message="Loggez un plat pour le voir ici"
        />
      </div>
    </div>
  </div>
</template>
