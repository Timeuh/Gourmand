import type { VNodeRef } from "vue";

// composable to create a recipe in database
export function useRecipeUtils() {
  // get modal utils from composable
  const { closeModal, openModal } = useRecipeModal();

  // get user from session
  const { user } = useUserSession();

  // get toast display logic
  const { displayToast } = useToast();

  // get the function to refresh home data
  const { refresh: refreshHome } = useFetch("/api/home", { key: "home" });

  // get the function to refresh food data
  const { refresh: refreshFoods } = useFetch("/api/foods?lastEaten=true", {
    key: "LogModal",
  });

  // get the function to refresh food page data
  const { refresh: refreshFoodsPage } = useFetch(
    "/api/foods?fullContent=true",
    {
      key: "FoodPage",
    },
  );

  // recipe modal button text
  const modalTitle = useState<string>(
    "RecipeModalText",
    () => "Ajouter une recette",
  );

  // recipe modal button text
  const buttonText = useState<string>("RecipeButtonText", () => "Créer");

  // error for the form
  const formError = ref<string>("Vous devez remplir les champs :");

  // should the error be displayed
  const showError = ref<boolean>(false);

  // reference food for the form inputs
  const formFood = useState<Food>("RecipeFood", () => {
    return {
      id: -1,
      user_id: user.value?.id || -1,
      preptime_id: 1,
      plates: 1,
      image: "",
      name: "",
    };
  });

  // list of ingredients ids
  const selectedIngredients = useState<number[]>("RecipeIngredients", () => []);

  // image data
  const imageInput = ref<VNodeRef | null>(null);
  const imagePreview = useState<string>(
    "RecipeImage",
    () => "/assets/default_food.png",
  );
  const imageFile = ref<File | undefined>(undefined);

  // reset form inputs
  function clearForm() {
    // reset image input and temporary url
    imagePreview.value = "/assets/default_food.png";
    imageFile.value = undefined;
    if (imageInput.value) {
      imageInput.value.value = "";
    }

    // reset form food values
    formFood.value = {
      id: -1,
      user_id: user.value?.id || -1,
      preptime_id: 1,
      plates: 1,
      image: "",
      name: "",
    };

    // empty selected ingredients
    selectedIngredients.value = [];

    // reset form error
    formError.value = "Vous devez remplir les champs :";
    showError.value = false;

    // reset button text
    buttonText.value = "Créer";
    modalTitle.value = "Ajouter une recette";
  }

  // create recipe in database
  async function createOrUpdateRecipe() {
    try {
      // format image filename
      const filename = `${user.value?.id}_${imageFile.value?.name}`;
      const verifyFilename = `/uploads/foods/${filename}`;

      // if the image does not exist yet
      if (
        verifyFilename !== formFood.value.image &&
        imageFile.value !== undefined
      ) {
        // create form data for image api creation
        const imageForm = new FormData();
        imageForm.append("filename", filename);
        imageForm.append("image", imageFile.value!);

        // call image storing api
        await $fetch("/api/images", {
          method: "POST",
          body: imageForm,
        });

        // update form food filename
        formFood.value.image = `/uploads/foods/${filename}`;
      }

      // if the food does not exist yet
      if (formFood.value.id == -1) {
        // create food in database
        const createdFood = await $fetch<Food>("/api/foods", {
          method: "POST",
          body: {
            name: formFood.value.name,
            image: formFood.value.image,
            preptime_id: formFood.value.preptime_id,
            plates: formFood.value.plates,
            user_id: formFood.value.user_id,
          },
        });

        // link the ingredients to the created food
        await $fetch(`/api/foods/${createdFood.id}/ingredients`, {
          method: "POST",
          body: selectedIngredients.value,
        });
      } else {
        // update the food in database
        await $fetch(`/api/foods/${formFood.value.id}`, {
          method: "PUT",
          body: {
            name: formFood.value.name,
            image: formFood.value.image,
            preptime_id: formFood.value.preptime_id,
            plates: formFood.value.plates,
            user_id: formFood.value.user_id,
          },
        });

        // link or unlink the ingredients if needed
        await $fetch(`/api/foods/${formFood.value.id}/ingredients`, {
          method: "POST",
          body: selectedIngredients.value,
        });
      }

      // refresh home and food logging data
      await refreshHome();
      await refreshFoods();
      await refreshFoodsPage();

      // display a confirmation toast
      if (formFood.value.id == -1) {
        displayToast("Recette créée");
      } else {
        displayToast("Recette modifiée");
      }

      // reset form and close the modal
      clearForm();
      closeModal();
    } catch (error) {
      // display error to user
      console.error(error);
      formError.value =
        "Erreur lors de la création ou modification, veuillez réessayer";
      showError.value = true;
    }
  }

  // load the food into the recipe modal
  function loadRecipe(food: FullFood) {
    // load food
    formFood.value = {
      id: food.id,
      user_id: user.value?.id || -1,
      preptime_id: food.preptime_id,
      plates: food.plates,
      image: food.image,
      name: food.name,
    };

    // load food ingredients
    selectedIngredients.value = food.foodIngredients.map(
      (ingredient) => ingredient.ingredient.id,
    );

    // load food image
    imagePreview.value = food.image;

    // change recipe modal button and title texts
    buttonText.value = "Modifier";
    modalTitle.value = "Modifier une recette";

    // open the recipe modal
    openModal();
  }

  return {
    user,
    formError,
    showError,
    formFood,
    selectedIngredients,
    imagePreview,
    imageFile,
    imageInput,
    buttonText,
    modalTitle,
    clearForm,
    createOrUpdateRecipe,
    loadRecipe,
  };
}
