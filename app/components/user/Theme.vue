<script lang="ts" setup>
// get user session utils
const { user, fetch, loggedIn } = useUserSession();

// get toast display utils
const { displayToast } = useToast();

// currently selected theme
const currentTheme = ref<number>(user.value?.theme_id || 1);

// update user theme in database and session
async function updateTheme() {
  // do nothing if theme is the currently used one
  if (currentTheme.value == user.value?.theme_id) return;

  // update in database and in user session
  await $fetch(`/api/users/${user.value?.id || 0}`, {
    method: "PUT",
    body: {
      email: user.value?.email,
      theme_id: currentTheme.value,
      month_objective: user.value?.month_objective,
    },
  });

  // refresh session
  await fetch();

  // display a toast to tell user the food has been added
  displayToast("Thème modifié");
}
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
    <button
      @click="updateTheme"
      class="flex flex-row justify-center items-center space-x-2 bg-primary-900 hover:bg-primary-100 p-2 rounded-xl w-full h-12 text-background-900 hover:text-primary-900 transition duration-300 ease-in-out cursor-pointer"
    >
      <IconEdit class="size-6" />
      <h4 class="text-lg">Mettre à jour</h4>
    </button>
  </section>
</template>
