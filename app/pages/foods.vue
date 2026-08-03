<script setup lang="ts">
useHead({
  title: "Gourmand - Plats",
});
definePageMeta({
  middleware: ["authenticated"],
});

// fetch all foods
const { data } = useFetch<ApiCollection<FullFood>>(
  "/api/foods?fullContent=true",
  { key: "FoodPage" },
);

// search input value
const search = useState<string>("FoodsSearch", () => "");

// array of selected ingredient ids
const selectedIngredients = useState<number[]>(
  "FoodsIngredientsFilter",
  () => [],
);

// food for the filters
const formFood = useState<Food>("FoodsPreptimeFilter", () => {
  return {
    id: -1,
    user_id: -1,
    preptime_id: 0,
    plates: 1,
    image: "",
    name: "",
  };
});

// foods filtered by search value
const foodsToDisplay: ComputedRef<FullFood[] | undefined> = computed(() => {
  return data.value?.items
    .filter((food) =>
      // compare food name with search string
      food.name.toLowerCase().includes(search.value.toLowerCase()),
    )
    .filter(
      (food) =>
        // filter foods with selected preptime id, dont filter if the preptime is the default one
        food.preptime_id == formFood.value.preptime_id ||
        formFood.value.preptime_id == 0,
    )
    .filter((food) =>
      // check for every filter selected ingredient
      selectedIngredients.value.every((ingredientId) =>
        // check if food has this ingredient id
        food.foodIngredients.some(
          (foodIngredient) => foodIngredient.ingredient.id === ingredientId,
        ),
      ),
    );
});
</script>

<template>
  <div
    class="space-y-6 bg-background-500 xl:p-12 px-6 py-8 xl:pt-4 pb-[12vh] xl:pb-0 w-full xl:w-5/6 min-h-screen overflow-hidden select-none"
  >
    <ModalFoodRecipe />
    <section id="first-row" class="flex flex-row justify-between w-full">
      <div class="w-2/3">
        <h1 class="font-bold text-secondary-900 text-2xl">
          🍴 Liste des plats
        </h1>
        <h2 class="text-md text-secondary-500">
          {{ formatDate(new Date()) }}
        </h2>
      </div>
      <div
        class="hidden xl:flex flex-row justify-end items-center space-x-4 w-1/3"
      >
        <ButtonAdd />
      </div>
      <div class="xl:hidden h-max">
        <ButtonMobileAdd />
      </div>
    </section>
    <section id="second-row" class="space-y-4">
      <div
        class="relative flex flex-row justify-between items-center space-x-4"
      >
        <SearchBar :ref-key="'FoodsSearch'" />
        <MobileFoodsFilter />
      </div>
      <div class="gap-3 grid grid-cols-2 w-full">
        <CardFood
          v-for="food in foodsToDisplay"
          :card-food="food"
          class="h-48"
        />
      </div>
    </section>
  </div>
</template>
