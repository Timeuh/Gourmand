<script lang="ts" setup>
useHead({
  title: "Gourmand",
});
definePageMeta({
  middleware: ["authenticated"],
});

const { user, loggedIn } = useUserSession();
</script>

<template>
  <div class="bg-background-500 p-8 w-full h-screen">
    <h1>Accueil</h1>

    <div v-if="loggedIn">
      <p>Bienvenue, {{ user?.name }} !</p>
    </div>
  </div>
</template>
