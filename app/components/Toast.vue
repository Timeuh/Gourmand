<script setup lang="ts">
const { showToast, toastContent, closeToast } = useToast();
</script>

<template>
  <div
    :class="showToast ? 'translate-x-0' : 'translate-x-[120%]'"
    class="right-2 bottom-[12vh] xl:bottom-[2vh] z-30 fixed flex flex-row items-center space-x-2 xl:space-x-4 bg-background-900 shadow-[0_2px_2px_0] shadow-secondary-900/50 p-3 rounded-md w-[45vw] xl:w-[15vw] h-14 transition duration-300 ease-in-out"
  >
    <IconSuccess class="size-5 xl:size-7 text-success" />
    <h2 class="text-secondary-900 text-lg xl:text-xl">{{ toastContent }}</h2>
    <button class="top-2 right-2 fixed cursor-pointer" @click="closeToast">
      <IconCross class="size-5 text-secondary-500" />
    </button>
  </div>
</template>
