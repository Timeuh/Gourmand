<script lang="ts" setup>
// get theme utils from composable
const { data, currentTheme, updateTheme } = useTheme();

// get user session utils
const { loggedIn } = useUserSession();
</script>

<template>
  <section
    v-if="loggedIn"
    class="flex flex-col items-center space-y-4 bg-background-900 shadow-[0_1px_2px_0] shadow-secondary-900/50 px-8 py-6 rounded-xl w-full xl:w-1/2 text-secondary-900"
  >
    <div class="text-center">
      <h2 class="font-bold text-2xl text-center">Thème de l'application</h2>
      <h3 class="text-md text-secondary-500">Choisissez un thème</h3>
    </div>
    <div
      class="gap-3 grid grid-cols-1 xl:grid-cols-2 p-1 w-full xl:h-[21vh] overflow-scroll"
    >
      <label
        v-for="theme in data?.items"
        :key="theme.id"
        class="group space-y-2 shadow-[0_0_2px_0] shadow-secondary-900/50 p-2 border border-transparent has-checked:border-primary-900 rounded-xl w-full h-fit cursor-pointer"
      >
        <div class="flex flex-row justify-between items-center w-full">
          <h3 class="font-bold">{{ theme.name }}</h3>
          <input
            v-model="currentTheme"
            type="radio"
            :value="theme.id"
            name="theme"
            class="size-5 accent-primary-900 cursor-pointer"
          />
        </div>
        <div class="gap-2 grid grid-cols-4 w-full">
          <div
            v-for="color in theme.themeColors"
            :key="color.color.code"
            class="w-full h-fit"
          >
            <div
              :style="{ backgroundColor: color.color.code }"
              class="shadow-[0_0_2px_0] shadow-secondary-900/50 rounded-md w-full h-6"
            />
          </div>
        </div>
      </label>
    </div>
    <button
      @click="updateTheme"
      class="flex flex-row justify-center items-center space-x-2 bg-primary-900 hover:bg-primary-100 p-2 rounded-xl w-full xl:w-1/2 h-12 text-background-900 hover:text-primary-900 transition duration-300 ease-in-out cursor-pointer"
    >
      <IconSave class="size-6" />
      <h4 class="text-lg">Sauvegarder</h4>
    </button>
  </section>
</template>
