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
  <div
    class="flex flex-row justify-between items-center space-x-6 bg-background-900 shadow-[0_1px_2px_0] shadow-secondary-900/50 p-4 rounded-xl text-secondary-900"
  >
    <div class="space-y-4 w-4/5">
      <h2 class="font-bold text-lg">🫜 Variété ce mois</h2>
      <ProgressBar :percentage="percentage" height="h-2" />
      <div>
        <h3 class="font-bold text-md">
          {{ props.thisMonth }} plats différents
        </h3>
        <h4 class="text-secondary-500 text-sm">
          <span v-if="difference > 0" class="text-green-600">+</span>
          <span v-if="difference == 0" class="text-red-600">-</span>
          <span :class="difference <= 0 ? 'text-red-600' : 'text-green-600'">{{
            difference
          }}</span>
          vs mois dernier
        </h4>
      </div>
    </div>
    <div class="flex flex-col justify-center items-center space-y-2 w-1/5">
      <div class="flex flex-col justify-center items-center">
        <h2 class="font-bold text-primary-900 text-2xl">{{ percentage }} %</h2>
        <h3 class="text-secondary-500 text-sm text-center">
          objectif de <span class="text-primary-900">15</span>
        </h3>
      </div>
      <div
        class="flex flex-col justify-center bg-primary-100 shadow-[0_1px_2px_0] shadow-secondary-900/50 rounded-full size-11"
      >
        <h2 class="text-2xl text-center">🏆</h2>
      </div>
    </div>
  </div>
</template>
