<script setup lang="ts">
import type { VNodeRef } from "vue";

// get modal utils from composable
const { showModal, closeModal } = useRecipeModal();

// get user from session
const { user } = useUserSession();

// get toast display logic
const { displayToast } = useToast();

// get all preptimes
const { data: preptimeData } =
  useFetch<ApiCollection<Preptime>>("/api/preptimes");

// get all ingredients
const { data: ingredientData } =
  useFetch<ApiCollection<Ingredient>>("/api/ingredients");

// get the function to refresh home data
const { refresh: refreshHome } = useFetch("/api/home", { key: "home" });

// get the function to refresh food data
const { refresh: refreshFoods } = useFetch("/api/foods?lastEaten=true", {
  key: "LogModal",
});

// error for the form
const formError = ref<string>("Vous devez remplir les champs :");

// should the error be displayed
const showError = ref<boolean>(false);

// show or hide the error depending on its current state
function changeErrorState(newState: boolean) {
  showError.value = newState;
}

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
    case 1:
      return "🥕 LEGUMES";

    case 2:
      return "🍓 FRUITS";

    case 3:
      return "🍗 VIANDES ET POISSONS";

    case 4:
      return "🧂 ASSAISONNEMENT";

    case 5:
      return "🍟 ACCOMPAGNEMENT";

    default:
      return "";
  }
}

// reference food for the form inputs
const formFood = ref<Food>({
  id: -1,
  user_id: user.value?.id || -1,
  preptime_id: 1,
  plates: 1,
  image: "",
  name: "",
});

// list of ingredients ids
const selectedIngredients = ref<number[]>([]);

// init form image references
const imageInput = ref<VNodeRef | null>(null);
const imagePreview = ref<string>("/assets/default_food.png");
const imageFile = ref<File | undefined>(undefined);

// open the file picker on click
function openFilePicker() {
  if (!imageInput.value) return;

  imageInput.value.click();
}

// handle the file selection
function handleFile(event: Event) {
  // get the image from the input
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  // if there is no image, or the image is not valid do nothing
  if (
    !file ||
    (!file.name.endsWith(".jpg") &&
      !file.name.endsWith(".jpeg") &&
      !file.name.endsWith(".png"))
  )
    return;

  // store image and generate url to display it
  imageFile.value = file;
  imagePreview.value = URL.createObjectURL(file);
}

// remove current chosen file and put base image instead
function removeFile() {
  imagePreview.value = "/assets/default_food.png";
}

// increment food plates
function increment() {
  formFood.value.plates++;
}

// decrement food plates, minimum 1
function decrement() {
  if (formFood.value.plates == 1) return;

  formFood.value.plates--;
}

// verify form inputs
function verifyForm(): boolean {
  let isValid = true;
  formError.value = "Vous devez remplir les champs :";

  if (imagePreview.value === "/assets/default_food.png") {
    isValid = false;
    formError.value += " image, ";
  }

  if (formFood.value.name == "") {
    isValid = false;
    formError.value += " nom, ";
  }

  if (selectedIngredients.value.length == 0) {
    isValid = false;
    formError.value += " au moins 1 ingrédient";
  }

  return isValid;
}

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
}

// reset form and close modal
function resetFormAndClose() {
  closeModal();
  clearForm();
}

// handle form submission
async function submitForm(_event: SubmitEvent) {
  // check form validity and display error if needed
  const isValid = verifyForm();
  changeErrorState(!isValid);

  // do nothing if form is invalid
  if (!isValid) return;

  try {
    // create form data for image api creation
    const imageForm = new FormData();
    const filename = `${user.value?.id}_${imageFile.value?.name}`;
    imageForm.append("filename", filename);
    imageForm.append("image", imageFile.value!);

    // call image storing api
    await $fetch("/api/images", {
      method: "POST",
      body: imageForm,
    });

    // create food in database
    const createdFood = await $fetch<Food>("/api/foods", {
      method: "POST",
      body: {
        name: formFood.value.name,
        image: `/uploads/foods/${filename}`,
        preptime_id: formFood.value.preptime_id,
        plates: formFood.value.plates,
        user_id: formFood.value.user_id,
      },
    });

    // link each ingredient to the created food
    selectedIngredients.value.forEach((ingredient: number) => {
      $fetch(`/api/foods/${createdFood.id}/ingredients/${ingredient}`, {
        method: "POST",
      });
    });

    // refresh home and food logging data
    await refreshHome();
    await refreshFoods();

    // reset form and close the modal
    clearForm();
    closeModal();

    // display a confirmation toast
    displayToast("Recette créée");
  } catch (error: any) {
    // display error to user
    console.error(error);
    formError.value = "Erreur lors de la création, veuillez réessayer";
    changeErrorState(true);
  }
}

// form content ref
const modalContent = ref<HTMLElement | null>(null);

// reset form scroll when modal is open
watch(showModal, async (open) => {
  if (open) {
    await nextTick();
    modalContent.value!.scrollTop = 0;
  }
});
</script>

<template>
  <section
    :class="showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    class="z-20 fixed inset-0 flex flex-col justify-center items-center bg-black/50 backdrop-blur-xs w-full h-screen transition duration-500 ease-in-out"
  >
    <div class="space-y-3 bg-background-500 rounded-xl w-4/5 xl:w-1/3 h-4/5">
      <div class="flex flex-row justify-between items-center p-4 w-full">
        <h1 class="font-bold text-primary-900 text-xl">Ajouter une recette</h1>
        <button @click="resetFormAndClose" class="cursor-pointer">
          <IconCross class="size-6 text-primary-900" />
        </button>
      </div>
      <form
        ref="modalContent"
        novalidate
        @submit.prevent="submitForm"
        class="space-y-3 p-4 h-[90%] overflow-auto text-secondary-900"
      >
        <section id="form-image" class="space-y-2">
          <div class="flex flex-row justify-between items-center w-full">
            <label for="image" class="font-bold text-lg">Photo</label>
            <button
              type="button"
              @click="removeFile"
              v-if="imagePreview !== '/assets/default_food.png'"
              class="cursor-pointer"
            >
              <IconCross class="size-5 text-secondary-900" />
            </button>
          </div>
          <div class="relative p-2 w-full h-[20vh] xl:h-[35vh]">
            <input
              ref="imageInput"
              type="file"
              id="image"
              accept="image/*"
              class="hidden"
              @change="handleFile"
            />
            <NuxtImg
              :src="imagePreview"
              alt="Nourriture"
              class="absolute inset-0 shadow-[0_0_2px_0] shadow-secondary-900/50 rounded-lg w-full h-full object-cover"
            />
            <button
              type="button"
              @click="openFilePicker"
              class="z-30 absolute inset-0 flex flex-col justify-center items-center space-y-1 w-full h-full text-background-900 cursor-pointer"
            >
              <IconPhoto
                v-if="imagePreview === '/assets/default_food.png'"
                class="size-12"
              />
              <h3
                v-if="imagePreview === '/assets/default_food.png'"
                class="text-lg"
              >
                Choisir une photo du plat
              </h3>
            </button>
          </div>
        </section>
        <section id="form-name" class="space-y-2">
          <label for="name" class="font-bold text-lg">Nom</label>
          <input
            v-model="formFood.name"
            type="text"
            id="name"
            placeholder="Lasagnes"
            class="bg-background-900 shadow-[0_0_2px_0] shadow-secondary-900/50 p-2 rounded-md focus-within:outline focus-within:outline-primary-900 w-full text-secondary-900 placeholder:text-secondary-100"
          />
        </section>
        <section id="form-preptime" class="space-y-2">
          <label for="preptime" class="font-bold text-lg"
            >Temps de préparation</label
          >
          <select
            id="preptime"
            v-model.number="formFood.preptime_id"
            class="bg-background-900 shadow-[0_0_2px_0] shadow-secondary-900/50 p-2 rounded-md focus-within:outline focus-within:outline-primary-900 w-full text-secondary-900 placeholder:text-secondary-500"
          >
            <option
              v-for="preptime in preptimeData?.items"
              :value="preptime.id"
              :key="preptime.id"
            >
              {{ preptime.time }}
            </option>
          </select>
        </section>
        <section id="form-ingredients" class="space-y-2">
          <h2 class="font-bold text-lg">Ingrédients</h2>
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
                class="bg-background-900 has-checked:bg-primary-900 p-1 px-2 rounded-md w-fit has-checked:text-background-900 transition duration-300 ease-in-out"
              >
                <input
                  :id="`ingredient-${ingredient.id}`"
                  v-model="selectedIngredients"
                  type="checkbox"
                  :value="ingredient.id"
                  class="hidden"
                />

                <label
                  :for="`ingredient-${ingredient.id}`"
                  class="cursor-pointer"
                >
                  {{ ingredient.name }}
                </label>
              </div>
            </div>
          </section>
        </section>
        <section id="form-plates" class="space-y-2">
          <label for="plates" class="font-bold text-lg"
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
              id="plates"
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
        <h2 v-if="showError" class="text-red-700">{{ formError }}</h2>
        <div
          class="flex flex-row justify-end items-center space-x-2 text-background-900"
        >
          <button
            type="button"
            @click="resetFormAndClose"
            class="bg-secondary-500 hover:bg-secondary-900 p-2 rounded-md w-20 transition duration-300 ease-in-out cursor-pointer"
          >
            Annuler
          </button>
          <button
            class="bg-primary-900 hover:bg-primary-500 p-2 rounded-md w-20 transition duration-300 ease-in-out cursor-pointer"
          >
            Créer
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
