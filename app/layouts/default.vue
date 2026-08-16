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
    <div class="xl:hidden pb-24 w-full">
      <Footer />
    </div>
  </main>
</template>
