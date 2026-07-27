<script setup lang="ts">
import type { VNodeRef } from "vue";

// get modal utils from composable
const { showModal, closeModal } = useRecipeModal();

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

// handle form submission
function submitForm(_event: SubmitEvent) {
  console.log("submit");
}
</script>

<template>
  <section
    :class="showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    class="z-20 fixed inset-0 flex flex-col justify-center items-center bg-black/50 backdrop-blur-xs w-full h-screen transition duration-500 ease-in-out"
  >
    <div
      class="space-y-3 bg-background-500 p-4 rounded-xl w-4/5 xl:w-1/3 h-4/5"
    >
      <div class="flex flex-row justify-between items-center w-full">
        <h1 class="font-bold text-primary-900 text-xl">Ajouter une recette</h1>
        <button @click="closeModal" class="cursor-pointer">
          <IconCross class="size-6 text-primary-900" />
        </button>
      </div>
      <form
        novalidate
        @submit.prevent="submitForm"
        class="space-y-2 text-secondary-900"
      >
        <div class="space-y-2">
          <div class="flex flex-row justify-between items-center w-full">
            <label for="image" class="font-bold text-lg">Photo</label>
            <button
              type="button"
              @click="removeFile"
              v-if="imagePreview !== '/assets/default_food.png'"
            >
              <IconCross class="size-5 text-secondary-900" />
            </button>
          </div>
          <div class="relative p-2 w-full h-[20vh]">
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
              class="z-30 absolute inset-0 flex flex-col justify-center items-center space-y-1 w-full h-full text-background-900"
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
        </div>
        <button>Créer</button>
      </form>
    </div>
  </section>
</template>
