<script lang="ts" setup>
useHead({
  title: "Gourmand - Paramètres",
});

const { user, loggedIn, clear } = useUserSession();
</script>

<template>
  <div
    class="space-y-6 bg-background-500 p-8 w-full xl:w-5/6 h-screen select-none"
  >
    <section id="first-row">
      <h1 class="font-bold text-secondary-900 text-xl">⚙️ Paramètres</h1>
      <h2 class="text-md text-secondary-500">
        {{ formatDate(new Date()) }}
      </h2>
    </section>
    <div v-if="loggedIn">
      <p>Bienvenue, {{ user?.name }} !</p>
      <button @click="clear" class="bg-red-500 px-4 py-2 rounded text-white">
        Se déconnecter
      </button>
    </div>
    <div v-else>
      <a
        href="/api/auth/google"
        class="inline-block bg-blue-600 px-4 py-2 rounded font-medium text-white"
      >
        Se connecter avec Google
      </a>
    </div>
  </div>
</template>
