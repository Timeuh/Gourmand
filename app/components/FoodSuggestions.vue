<script setup lang="ts">
// define props types
interface Props {
  foods: OldestFood[] | undefined;
}

// register props
const props = defineProps<Props>();
</script>

<template>
  <div class="space-y-2 w-full xl:h-1/2">
    <div class="flex flex-row justify-between items-center w-full">
      <h2 class="font-bold text-secondary-900 text-lg">
        💡 Suggestions de repas
      </h2>
      <NuxtLink to="/foods" class="flex flex-row items-center text-primary-900">
        <h3>Tout voir</h3>
        <IconChevronRight class="size-5" />
      </NuxtLink>
    </div>
    <div class="gap-4 xl:gap-6 grid grid-cols-2 xl:grid-cols-4 w-full h-full">
      <CardLastEaten
        v-for="food in props.foods"
        :key="food.food?.id"
        :card-food="food"
        class="h-44"
      />
      <CardPlaceHolder
        v-if="props.foods?.length === 0"
        class="h-44"
        message="Ajoutez une recette pour la voir ici"
      />
    </div>
  </div>
</template>
