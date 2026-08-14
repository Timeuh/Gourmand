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
  image: "",
  plates: -1,
};
</script>

<template>
  <CardBase :class="props.class" :food="fakeFood">
    <template #overlay>
      <div
        class="absolute inset-0 flex flex-row justify-between items-center p-2 w-full text-secondary-900"
      >
        <h3 class="text-lg text-center">
          {{ props.message }}
        </h3>
      </div>
    </template>
  </CardBase>
</template>
