<script lang="ts" setup>
useHead({
  title: "Gourmand - Paramètres",
});

const { user, loggedIn, clear } = useUserSession();
</script>

<template>
  <div class="p-8 w-full h-screen bg-background-500">
    <h1>Paramètres</h1>

    <div v-if="loggedIn">
      <p>Bienvenue, {{ user?.name }} !</p>
      <button @click="clear" class="bg-red-500 text-white px-4 py-2 rounded">
        Se déconnecter
      </button>
    </div>

    <div v-else>
      <a
        href="/api/auth/google"
        class="inline-block bg-blue-600 text-white px-4 py-2 rounded font-medium"
      >
        Se connecter avec Google
      </a>
    </div>
  </div>
</template>
