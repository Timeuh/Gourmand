<script setup lang="ts">
// define props types
interface Props {
  cardFood: FullFood;
  class: string;
}

// register props
const props = defineProps<Props>();

// get recipe loading function from composable
const { loadRecipe } = useRecipeUtils();

// laod the food into the recipe edit modal
function openEditModal() {
  loadRecipe(props.cardFood);
}
</script>

<template>
  <CardBase :class="props.class" :food="props.cardFood">
    <template #overlay>
      <div
        class="bottom-0 absolute flex flex-row justify-between items-center bg-linear-to-t from-secondary-900 via-60% via-secondary-900/80 to-secondary-900/20 backdrop-blur-xs p-2 w-full"
      >
        <div class="space-y-1 w-full">
          <h3 class="font-bold text-secondary-100 text-sm text-balance">
            {{ props.cardFood.name }}
          </h3>
        </div>
        <button
          @click="openEditModal"
          class="flex flex-col justify-center items-center outline-none size-7 cursor-pointer shrink-0"
        >
          <IconEdit class="size-5 text-secondary-100" />
        </button>
      </div>
    </template>
  </CardBase>
</template>
