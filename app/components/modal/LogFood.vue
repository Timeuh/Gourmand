<script setup lang="ts">
// if the log modal is displayed or not
const showModal = useState<boolean>("LogModal", () => false);

// show or hide the modal depending on its state
function triggerModal() {
  showModal.value = !showModal.value;
}
</script>

<template>
  <section
    :class="showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    class="top-0 left-0 z-20 absolute flex flex-col justify-center items-center bg-black/50 backdrop-blur-xs w-full h-screen transition duration-500 ease-in-out"
  >
    <div class="bg-background-500 p-4 rounded-xl w-4/5 h-4/5">
      <div class="flex flex-row justify-between items-center w-full">
        <h1 class="font-bold text-primary-900 text-xl">Log un plat</h1>
        <button @click="triggerModal" class="cursor-pointer">
          <IconCross class="size-6 text-primary-900" />
        </button>
      </div>
    </div>
  </section>
</template>
