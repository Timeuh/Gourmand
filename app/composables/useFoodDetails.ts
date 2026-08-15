// composable to get food ingredients and preptimes data
export function useFoodDetails() {
  // get all preptimes
  const { data: preptimeData } = useFetch<ApiCollection<Preptime>>(
    "/api/preptimes",
    { key: "AllPreptimes" },
  );

  // get all ingredients
  const { data: ingredientData } = useFetch<ApiCollection<Ingredient>>(
    "/api/ingredients",
    { key: "AllIngredients" },
  );

  // regroup ingredients by category id
  const ingredientsByCategory = computed(() => {
    if (!ingredientData.value?.items) return {};

    return ingredientData.value.items.reduce(
      (acc, ingredient) => {
        const category = ingredient.category_id;

        if (!acc[category]) {
          acc[category] = [];
        }

        acc[category].push(ingredient);

        return acc;
      },
      {} as Record<number, Ingredient[]>,
    );
  });

  // assign each category id to a name
  function getCategoryName(categoryId: number) {
    switch (categoryId) {
      case 10000:
        return "🥕 LEGUMES";

      case 10001:
        return "🍓 FRUITS";

      case 10002:
        return "🍗 VIANDES ET POISSONS";

      case 10003:
        return "🧂 ASSAISONNEMENT";

      case 10004:
        return "🍟 ACCOMPAGNEMENT";

      default:
        return "";
    }
  }

  return {
    preptimeData,
    ingredientsByCategory,
    getCategoryName,
  };
}
