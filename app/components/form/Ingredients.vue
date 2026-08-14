<script setup lang="ts">
interface Props {
  refKey: string;
  prefix: string;
}

// define component props
const props = defineProps<Props>();

// get utils from food details composable
const { ingredientsByCategory, getCategoryName } = useFoodDetails();

// array of selected ingredient ids
const selectedIngredients = useState<number[]>(props.refKey, () => []);

// clear the selected ingredients array
function clearIngredients() {
  selectedIngredients.value = [];
}
</script>

<template>
  <section class="space-y-2">
    <div class="flex flex-row justify-between items-center">
      <h2 class="font-bold text-lg">Ingrédients</h2>
      <button @click="clearIngredients" v-if="selectedIngredients.length > 0">
        <IconCross class="size-5 text-secondary-900" />
      </button>
    </div>
    <section
      v-for="(ingredients, categoryId) in ingredientsByCategory"
      :key="categoryId"
      class="space-y-2 pb-2"
    >
      <h3>
        {{ getCategoryName(Number(categoryId)) }}
      </h3>
      <div class="flex flex-row flex-wrap gap-2">
        <div
          v-for="ingredient in ingredients"
          :key="ingredient.id"
          :class="
            selectedIngredients.includes(ingredient.id)
              ? 'bg-primary-900 text-secondary-100'
              : ''
          "
          class="bg-background-900 shadow-[0_0_2px_0] shadow-secondary-900/50 p-1 px-2 rounded-md w-fit transition duration-300 ease-in-out"
        >
          <input
            :id="`${prefix}-ingredient-${ingredient.id}`"
            v-model="selectedIngredients"
            type="checkbox"
            :value="ingredient.id"
            class="hidden"
          />
          <label
            :for="`${prefix}-ingredient-${ingredient.id}`"
            class="cursor-pointer"
          >
            {{ ingredient.name }}
          </label>
        </div>
      </div>
    </section>
  </section>
</template>
