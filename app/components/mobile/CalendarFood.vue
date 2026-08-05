<script setup lang="ts">
// get calendar utils from composable
const { selectedDate, showFoods, hideFoodsPanel } = useCalendarUtils();
</script>

<template>
  <div
    :class="showFoods ? 'translate-y-0' : 'translate-y-[80%]'"
    class="bottom-20 left-0 fixed bg-background-900 shadow-[0_0_2px_0] shadow-secondary-900/25 rounded-md w-full h-40 transition duration-300 ease-in-out"
  >
    <div class="flex flex-row justify-center items-center pt-2 w-full">
      <button
        class="bg-secondary-900 rounded-full w-1/3 h-1.5"
        @click="hideFoodsPanel"
      />
    </div>
    <div class="p-2">
      <h3>
        {{ selectedDate.day }}/{{ selectedDate.month }}/{{ selectedDate.year }}
      </h3>
    </div>
  </div>
</template>
