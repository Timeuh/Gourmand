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
const formFood = useState<Food>("FoodsFormFilter", () => {
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
        // filter foods with selected preptime id, dont filter for base value
        food.preptime_id == formFood.value.preptime_id ||
        formFood.value.preptime_id == 0,
    )
    .filter(
      (food) =>
        // filter foods with selected plates number, dont filter for base value
        food.plates == formFood.value.plates || formFood.value.plates == 1,
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
    <section
      id="second-row"
      class="xl:flex flex-row-reverse justify-between items-start space-y-3 xl:h-[88vh]"
    >
      <div
        class="relative flex flex-row xl:flex-col justify-between items-center xl:space-x-0 xl:w-1/3 xl:h-full"
      >
        <SearchBar :ref-key="'FoodsSearch'" />
        <MobileFoodsFilter />
        <div class="hidden xl:block h-[92%]">
          <FoodsAdvancedFilters />
        </div>
      </div>
      <div
        class="content-start gap-3 grid grid-cols-2 xl:grid-cols-4 p-2 w-full xl:w-[65%] xl:h-full overflow-auto"
      >
        <CardFood
          v-for="food in foodsToDisplay"
          :card-food="food"
          class="xl:w-full h-48"
        />
        <CardPlaceHolder
          v-if="foodsToDisplay?.length === 0"
          class="h-48"
          message="Ajoutez une recette pour la voir ici"
        />
      </div>
    </section>
  </div>
</template>
