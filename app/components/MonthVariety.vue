<script setup lang="ts">
// define props types
interface Props {
  thisMonth: number | undefined;
  lastMonth: number | undefined;
  objective: number | undefined;
}

// register props
const props = withDefaults(defineProps<Props>(), {
  thisMonth: 0,
  lastMonth: 0,
  objective: 15,
});

// calculate percentage of objective
const percentage = computed(() => {
  const percentage = Math.round((props.thisMonth / props.objective) * 100);
  if (percentage > 100) return 100;
  return percentage;
});

// calculate difference between foods of this month and last month
const difference = computed(() =>
  Math.round(props.thisMonth - props.lastMonth),
);

// calculate bubble margin in relation with percentage to prevent bubble from overflowing
const bubbleMargin = computed(() => {
  if (percentage.value >= 100) return 98;
  if (percentage.value == 0) return 2;
  return percentage.value;
});

// progress bar stops, in percentage
const barStops: ProgressBarStop[] = [
  {
    stop: 0,
    justify: "justify-self-start",
  },
  {
    stop: 25,
    justify: "justify-self-start",
  },
  {
    stop: 50,
    justify: "justify-self-center",
  },
  {
    stop: 75,
    justify: "justify-self-end",
  },
  {
    stop: 100,
    justify: "justify-self-end",
  },
];
</script>

<template>
  <div class="space-y-2 xl:w-3/5 h-full">
    <h2 class="font-bold text-secondary-900 text-lg">🫜 Variété ce mois</h2>
    <div
      class="flex xl:flex-row flex-col bg-background-900 shadow-[0_1px_2px_0] shadow-secondary-900/50 p-4 rounded-xl w-full text-secondary-900"
    >
      <div class="w-full xl:w-4/6">
        <div
          class="after:top-full after:left-1/2 after:absolute relative bg-primary-100 after:bg-primary-100 mb-2 px-2 py-1 rounded-lg w-10 after:size-2 after:rotate-45 -translate-x-1/2 -translate-y-1.5 after:-translate-x-1/2 after:-translate-y-1"
          :style="{
            marginLeft: `${bubbleMargin}%`,
          }"
        >
          <h3 class="text-primary-900 text-center">{{ props.thisMonth }}</h3>
        </div>
        <div class="relative w-full">
          <div
            class="flex flex-row justify-between items-center bg-primary-100 rounded-full w-full h-1"
          />
          <div
            class="top-0 left-0 absolute bg-primary-900 rounded-full h-1"
            :style="{ width: `${percentage}%` }"
          />
          <div
            class="flex flex-row justify-between w-full h-fit -translate-y-2.5"
          >
            <div
              v-for="stop in barStops"
              class="rounded-full size-4"
              :class="[
                stop.stop <= percentage ? 'bg-primary-500' : 'bg-primary-100',
              ]"
            />
          </div>
        </div>
      </div>
      <div
        class="flex flex-row xl:flex-col justify-between items-center w-full xl:w-2/6 xl:text-lg"
      >
        <h3 class="font-bold text-primary-900 text-2xl">{{ percentage }}%</h3>
        <h4>
          objectif de
          <span class="text-primary-900">{{ props.objective }}</span>
        </h4>
        <h4>
          <span v-if="difference > 0" class="text-success">+</span>
          <span v-if="difference == 0">autant que le</span>
          <span
            v-if="difference != 0"
            :class="difference <= 0 ? 'text-failure' : 'text-success'"
            >{{ difference }}</span
          >
          <span v-if="difference != 0"> vs</span>
          mois dernier
        </h4>
      </div>
    </div>
  </div>
</template>
