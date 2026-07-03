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
  <div class="p-8">
    <h1>Accueil</h1>

    <div v-if="loggedIn">
      <p>Bienvenue, {{ user?.name }} !</p>
    </div>
  </div>
</template>
