<script setup lang="ts">
// define props types
interface Props {
  class: string;
  message: string;
}

// register props
const props = defineProps<Props>();

// create fake food for base card
const fakeFood: Food = {
  id: -1,
  user_id: -1,
  preptime_id: -1,
  name: "",
  image: "/assets/default_food.png",
  plates: -1,
};
</script>

<template>
  <CardBase :class="props.class" :food="fakeFood">
    <template #overlay>
      <div
        class="bottom-0 absolute flex flex-row justify-between items-center bg-background-900 p-2 w-full text-secondary-900"
      >
        <div class="space-y-1 w-full">
          <h3 class="text-sm text-balance">
            {{ props.message }}
          </h3>
        </div>
      </div>
    </template>
  </CardBase>
</template>
