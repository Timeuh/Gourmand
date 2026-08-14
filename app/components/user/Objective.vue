<script lang="ts" setup>
// get user session utils
const { user, loggedIn, fetch } = useUserSession();

// get toast display utils
const { displayToast } = useToast();

// instanciate local objective to interract with
const currentObjective = ref<number>(user.value?.month_objective || 15);

// decrement objective, min is 5
function decrement() {
  if (currentObjective.value <= 5) return;

  currentObjective.value--;
}

// increment objective, no max provided
function increment() {
  currentObjective.value++;
}

// update user montly objective in database and session
async function updateObjective() {
  // do nothing if objective is already this number
  if (currentObjective.value == user.value?.month_objective) return;

  // update in database and in user session
  await $fetch(`/api/users/${user.value?.id || 0}`, {
    method: "PUT",
    body: {
      email: user.value?.email,
      theme_id: user.value?.theme_id,
      month_objective: currentObjective.value,
    },
  });

  // refresh session
  await fetch();

  // display a toast to tell user the food has been added
  displayToast("Objectif modifié");
}
</script>

<template>
  <section
    v-if="loggedIn"
    class="flex flex-col items-center space-y-4 bg-background-900 shadow-[0_1px_2px_0] shadow-secondary-900/50 px-8 py-6 rounded-xl w-full xl:w-1/2 text-secondary-900"
  >
    <h2 class="font-bold text-2xl text-center">Objectif mensuel de plats</h2>
    <div
      class="flex xl:flex-row flex-col xl:justify-around items-center space-y-4 xl:space-y-0 w-full"
    >
      <div class="flex flex-row justify-center items-center space-x-4 w-full">
        <button
          @click="decrement"
          :disabled="currentObjective == 5"
          class="flex flex-col justify-center items-center disabled:bg-background-500 border border-secondary-900 rounded-md size-12 cursor-pointer"
        >
          <IconMinus class="size-8" />
        </button>
        <h3 class="min-w-10 font-bold text-2xl text-center">
          {{ currentObjective }}
        </h3>
        <button
          @click="increment"
          class="flex flex-col justify-center items-center border border-secondary-900 rounded-md size-12 cursor-pointer"
        >
          <IconPlus class="size-8" />
        </button>
      </div>
      <button
        @click="updateObjective"
        class="flex flex-row justify-center items-center space-x-2 bg-primary-900 hover:bg-primary-100 p-2 rounded-xl w-full h-12 text-background-900 hover:text-primary-900 transition duration-300 ease-in-out cursor-pointer"
      >
        <IconSave class="size-6" />
        <h4 class="text-lg">Mettre à jour</h4>
      </button>
    </div>
  </section>
</template>
