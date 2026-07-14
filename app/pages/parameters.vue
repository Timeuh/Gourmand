<script lang="ts" setup>
useHead({
  title: "Gourmand - Paramètres",
});

const { user, loggedIn, clear } = useUserSession();
</script>

<template>
  <div class="bg-background-500 p-8 w-full xl:w-5/6 h-screen">
    <h1>Paramètres</h1>

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
