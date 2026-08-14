<script setup lang="ts">
const { showToast, toastContent } = useToast();
</script>

<template>
  <div
    :class="showToast ? 'translate-x-0' : 'translate-x-[120%]'"
    class="right-2 bottom-[12vh] xl:bottom-[2vh] z-30 fixed flex flex-row items-center space-x-2 bg-background-900 shadow-[0_0_2px_0] shadow-secondary-900/50 p-2 rounded-md h-10 text-success text-xl transition duration-300 ease-in-out"
  >
    <IconSuccess class="size-5" />
    <h2>{{ toastContent }}</h2>
  </div>
</template>
