<script setup lang="ts">
// define props types
interface Props {
  foods: Food[] | undefined;
}

// register props
const props = defineProps<Props>();
</script>

<template>
  <div class="flex flex-col space-y-2 xl:w-2/6 h-full text-secondary-900">
    <h2 class="font-bold text-lg">❤️ Plats préférés</h2>
    <div
      class="flex flex-row justify-between items-center bg-background-900 shadow-[0_1px_2px_0] shadow-secondary-900/50 p-4 rounded-xl w-full"
    >
      <h3
        v-if="props.foods?.length == 0"
        class="w-full xl:min-h-22 xl:text-lg text-center"
      >
        Ajoutez des plats pour qu'ils apparaissent
      </h3>
      <div v-for="food in props.foods" :key="food.id">
        <NuxtImg
          :src="food.image"
          :alt="food.name"
          class="shadow-[0_1px_4px_1px] shadow-secondary-900/50 rounded-full size-18 xl:size-22 object-cover"
        />
      </div>
    </div>
  </div>
</template>
