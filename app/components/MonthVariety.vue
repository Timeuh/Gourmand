<script setup lang="ts">
// define props types
interface Props {
  thisMonth: number | undefined;
  lastMonth: number | undefined;
}

// register props
const props = withDefaults(defineProps<Props>(), {
  thisMonth: 0,
  lastMonth: 0,
});

// calculate percentage of objective
const percentage = computed(() => Math.round((props.thisMonth / 15) * 100));

// calculate difference between foods of this month and last month
const difference = computed(() =>
  Math.round(props.thisMonth - props.lastMonth),
);
</script>

<template>
  <div class="space-y-2 xl:w-3/5 h-full">
    <h2 class="font-bold text-secondary-900 text-lg">🫜 Variété ce mois</h2>
    <div
      class="flex flex-col space-y-2 bg-background-900 shadow-[0_1px_2px_0] shadow-secondary-900/50 p-4 rounded-xl w-full xl:h-[14vh] text-secondary-900"
    >
      <div class="flex flex-row justify-between items-center w-full">
        <div class="w-4/6">
          <ProgressBar :percentage="percentage" height="h-2 xl:h-3" />
        </div>
        <div
          class="flex xl:flex-row flex-col justify-center items-center xl:space-x-2 w-2/6"
        >
          <h2 class="font-bold text-primary-900 text-2xl xl:text-3xl">
            {{ percentage }} %
          </h2>
          <h3 class="text-secondary-500 text-sm xl:text-xl">
            objectif de <span class="text-primary-900">15</span>
          </h3>
        </div>
      </div>
      <div class="flex flex-row justify-between items-center w-full">
        <div>
          <h3 class="font-bold text-md xl:text-xl">
            {{ props.thisMonth }} plats différents
          </h3>
          <h4 class="text-secondary-500 text-sm xl:text-lg">
            <span v-if="difference > 0" class="text-green-600">+</span>
            <span v-if="difference == 0" class="text-red-600">-</span>
            <span
              :class="difference <= 0 ? 'text-red-600' : 'text-green-600'"
              >{{ difference }}</span
            >
            vs mois dernier
          </h4>
        </div>
        <div class="flex flex-row justify-center w-2/6">
          <div
            class="flex flex-col justify-center bg-primary-100 shadow-[0_1px_2px_0] shadow-primary-900/50 rounded-full size-11 xl:size-14"
          >
            <h2 class="text-2xl xl:text-3xl text-center">🏆</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
