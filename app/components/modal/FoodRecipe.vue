<script setup lang="ts">
// get utils for recipe creation from the composable
const {
  formError,
  showError,
  formFood,
  selectedIngredients,
  imagePreview,
  imageFile,
  imageInput,
  buttonText,
  modalTitle,
  showDeleteButton,
  clearForm,
  createOrUpdateRecipe,
  deleteRecipe,
} = useRecipeUtils();

// get modal utils from composable
const { showModal, closeModal } = useRecipeModal();

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
  imagePreview.value = "";
}

// verify form inputs
function verifyForm(): boolean {
  let isValid = true;
  formError.value = "Vous devez remplir les champs :";

  if (imagePreview.value === "") {
    isValid = false;
    formError.value += " image, ";
  }

  if (formFood.value.name == "") {
    isValid = false;
    formError.value += " nom, ";
  }

  if (formFood.value.preptime_id == 0) {
    isValid = false;
    formError.value += " temps de préparation, ";
  }

  if (selectedIngredients.value.length == 0) {
    isValid = false;
    formError.value += " au moins 1 ingrédient";
  }

  return isValid;
}

// reset form and close modal
function resetFormAndClose() {
  closeModal();
  // wait for the transition to take effect before clearing the form
  setTimeout(() => clearForm(), 500);
}

// handle form submission
async function submitForm(_event: SubmitEvent) {
  // check form validity and display error if needed
  const isValid = verifyForm();
  showError.value = !isValid;

  // do nothing if form is invalid
  if (!isValid) return;

  // wait for recipe creation or update
  await createOrUpdateRecipe();
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

// if the delete confirmation window should be displayed
const showDeleteConfirmation = ref<boolean>(false);

// show delete confirmation window
function clickDeleteRecipe() {
  showDeleteConfirmation.value = true;
}

// exit the delete confirmation window
function exitConfirmation() {
  showDeleteConfirmation.value = false;
}

// delete the recipe
function deleteRecipeForever() {
  deleteRecipe();
  showDeleteConfirmation.value = false;
}
</script>

<template>
  <section
    :class="showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    class="z-20 fixed inset-0 flex flex-col justify-center items-center bg-black/50 backdrop-blur-xs w-full h-screen transition duration-500 ease-in-out"
  >
    <div class="relative bg-background-500 rounded-xl w-4/5 xl:w-1/3 h-4/5">
      <div
        id="delete-confirmation"
        :class="
          showDeleteConfirmation
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        "
        class="z-40 absolute inset-0 flex flex-col justify-center items-center bg-black/50 transition duration-300 ease-in-out"
      >
        <div
          class="relative flex flex-col items-center space-y-2 bg-background-900 p-2 rounded-md w-4/5"
        >
          <div class="flex flex-row justify-end items-center w-full">
            <button type="button" @click="exitConfirmation">
              <IconCross class="size-5 text-primary-900" />
            </button>
          </div>
          <h2 class="font-bold text-secondary-900 text-xl text-center">
            Vous êtes sur le point de supprimer cette recette
          </h2>
          <button
            type="button"
            @click="deleteRecipeForever"
            class="bg-primary-900 hover:bg-primary-100 p-2 rounded-md text-primary-100 hover:text-primary-900 transition duration-300 ease-in-out cursor-pointer"
          >
            Supprimer définitivement
          </button>
        </div>
      </div>
      <div class="flex flex-row justify-between items-center p-4 w-full">
        <h1 class="font-bold text-primary-900 text-xl">{{ modalTitle }}</h1>
        <button @click="resetFormAndClose" class="cursor-pointer">
          <IconCross class="size-6 text-primary-900" />
        </button>
      </div>
      <form
        ref="modalContent"
        novalidate
        @submit.prevent="submitForm"
        class="space-y-3 px-4 h-[90%] overflow-auto text-secondary-900"
      >
        <section id="form-image" class="space-y-2">
          <div class="flex flex-row justify-between items-center w-full">
            <label for="image" class="font-bold text-lg">Photo</label>
            <button
              type="button"
              @click="removeFile"
              v-if="imagePreview !== ''"
              class="cursor-pointer"
            >
              <IconCross class="size-5 text-secondary-900" />
            </button>
          </div>
          <div
            class="relative bg-secondary-900 p-2 rounded-lg w-full h-[20vh] xl:h-[35vh]"
          >
            <input
              ref="imageInput"
              type="file"
              id="image"
              accept="image/*"
              class="hidden"
              @change="handleFile"
            />
            <NuxtImg
              v-if="imagePreview != ''"
              :src="imagePreview"
              alt="Nourriture"
              class="absolute inset-0 shadow-[0_0_2px_0] shadow-secondary-900/50 rounded-lg w-full h-full object-cover"
            />
            <button
              type="button"
              @click="openFilePicker"
              class="z-30 absolute inset-0 flex flex-col justify-center items-center space-y-1 w-full h-full text-secondary-100 cursor-pointer"
            >
              <IconPhoto v-if="imagePreview === ''" class="size-12" />
              <h3 v-if="imagePreview === ''" class="text-lg">
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
            class="bg-background-900 shadow-[0_0_2px_0] shadow-secondary-900/50 p-2 rounded-md focus-within:outline focus-within:outline-primary-900 w-full text-secondary-900 placeholder:text-secondary-500"
          />
        </section>
        <section id="form-preptime">
          <FormPreptime ref-key="RecipeFood" prefix="recipe" />
        </section>
        <section id="form-ingredients">
          <FormIngredients ref-key="RecipeIngredients" prefix="recipe" />
        </section>
        <section id="form-plates">
          <FormPlates ref-key="RecipeFood" prefix="recipe" />
        </section>
        <h2 v-if="showError" class="text-red-700">{{ formError }}</h2>
        <div class="flex flex-row justify-between items-center">
          <button
            type="button"
            v-if="showDeleteButton"
            @click="clickDeleteRecipe"
            class="cursor-pointer"
          >
            <IconTrash class="size-8 text-failure" />
          </button>
          <div
            class="flex flex-row justify-end space-x-2 w-full text-secondary-100"
          >
            <button
              type="button"
              @click="resetFormAndClose"
              class="bg-secondary-500 hover:bg-secondary-900 p-2 rounded-md w-20 transition duration-300 ease-in-out cursor-pointer"
            >
              Annuler
            </button>
            <button
              class="bg-primary-900 hover:bg-primary-100 p-2 rounded-md w-20 text-primary-100 hover:text-primary-900 transition duration-300 ease-in-out cursor-pointer"
            >
              {{ buttonText }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>
