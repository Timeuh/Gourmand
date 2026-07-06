<script lang="ts" setup>
// set page title
useHead({
  title: "Gourmand",
});
// prevent access to this page if the user is not logged in
definePageMeta({
  middleware: ["authenticated"],
});

// get the user session
const { user } = useUserSession();
</script>

<template>
  <div class="bg-background-500 p-8 w-full h-screen">
    <div>
      <h1 class="font-bold text-secondary-900 text-xl">
        Bonjour {{ user?.name }} 👋
      </h1>
      <h2 class="text-md text-secondary-500">
        {{ formatDate(new Date()) }}
      </h2>
    </div>
  </div>
</template>
