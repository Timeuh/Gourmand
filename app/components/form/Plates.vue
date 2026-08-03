<script setup lang="ts">
interface Props {
  refKey: string;
  prefix: string;
}

// define component props
const props = defineProps<Props>();

// reference food for the form inputs
const formFood = useState<Food>(props.refKey, () => {
  return {
    id: -1,
    user_id: -1,
    preptime_id: 0,
    plates: 1,
    image: "",
    name: "",
  };
});

// increment food plates
function increment() {
  formFood.value.plates++;
}

// decrement food plates, minimum 1
function decrement() {
  if (formFood.value.plates == 1) return;

  formFood.value.plates--;
}
</script>

<template>
  <section>
    <label :for="`${props.prefix}-plates`" class="font-bold text-lg"
      >Nombre de portions</label
    >
    <div class="flex flex-row items-center space-x-4 text-secondary-900">
      <button
        type="button"
        @click="decrement"
        :disabled="formFood.plates == 1"
        class="bg-background-900 disabled:bg-secondary-100 shadow-[0_0_2px_0] shadow-secondary-900/50 p-1 rounded-md cursor-pointer"
      >
        <IconMinus class="size-4 xl:size-6" />
      </button>
      <input
        type="number"
        :id="`${props.prefix}-plates`"
        v-model="formFood.plates"
        readonly
        class="outline-none w-5 xl:w-9 text-lg xl:text-xl select-none"
      />
      <button
        type="button"
        @click="increment"
        class="bg-background-900 shadow-[0_0_2px_0] shadow-secondary-900/50 p-1 rounded-md cursor-pointer"
      >
        <IconPlus class="size-4 xl:size-6" />
      </button>
    </div>
  </section>
</template>
