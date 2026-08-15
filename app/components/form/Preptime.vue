<script setup lang="ts">
interface Props {
  refKey: string;
  prefix: string;
}

// define component props
const props = defineProps<Props>();

// get utils from food details composable
const { preptimeData } = useFoodDetails();

// reference food for the form inputs
const formFood = useState<Food>(props.refKey, () => {
  return {
    id: -1,
    user_id: -1,
    preptime_id: 10000,
    plates: 1,
    image: "",
    name: "",
  };
});
</script>

<template>
  <section>
    <label :for="`${props.prefix}-preptime`" class="font-bold text-lg"
      >Temps de préparation</label
    >
    <select
      :id="`${props.prefix}-preptime`"
      v-model.number="formFood.preptime_id"
      class="bg-background-900 shadow-[0_0_2px_0] shadow-secondary-900/50 mt-1 p-2 rounded-md focus-within:outline focus-within:outline-primary-900 w-full text-secondary-900 placeholder:text-secondary-500"
    >
      <option value="0">Choisissez un temps</option>
      <option
        v-for="preptime in preptimeData?.items"
        :value="preptime.id"
        :key="`${props.prefix}-preptime-${preptime.id}`"
      >
        {{ preptime.time }}
      </option>
    </select>
  </section>
</template>
