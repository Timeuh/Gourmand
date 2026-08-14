<script setup lang="ts">
const { currentThemeName } = useTheme();
</script>

<template>
  <main
    class="xl:flex flex-row min-w-full min-h-screen"
    :class="currentThemeName"
  >
    <Navbar />
    <Sidebar />
    <slot />
    <Toast />
  </main>
</template>
