<script setup lang="ts">
// get current route path
const route = useRoute();

const { loggedIn } = useUserSession();
</script>

<template>
  <div
    class="xl:hidden bottom-0 z-10 fixed flex flex-row justify-between items-center bg-background-900 shadow-[0_0_4px_0] shadow-secondary-900/25 p-4 w-full h-22 text-secondary-900"
  >
    <NuxtLink
      :to="loggedIn ? '/' : undefined"
      class="w-1/5"
      :class="{ 'pointer-events-none opacity-50': !loggedIn }"
    >
      <div
        class="flex flex-col items-center space-y-1 p-2 rounded-md w-full transition-all duration-500 ease-in-out"
        :class="route.path === '/' ? 'text-primary-900 bg-primary-100' : ''"
      >
        <IconHouse class="size-6" />
        <h3>Accueil</h3>
      </div>
    </NuxtLink>
    <NuxtLink
      :to="loggedIn ? '/foods' : undefined"
      class="w-1/5"
      :class="{ 'pointer-events-none opacity-50': !loggedIn }"
    >
      <div
        class="flex flex-col items-center space-y-1 p-2 rounded-md min-w-full transition-all duration-500 ease-in-out"
        :class="
          route.path === '/foods' ? 'text-primary-900 bg-primary-100' : ''
        "
      >
        <IconList class="size-6" />
        <h3>Plats</h3>
      </div>
    </NuxtLink>
    <NuxtLink
      :to="loggedIn ? '/calendar' : undefined"
      :class="{ 'pointer-events-none opacity-50': !loggedIn }"
    >
      <div
        class="flex flex-col items-center space-y-1 p-2 rounded-md transition-all duration-500 ease-in-out"
        :class="
          route.path === '/calendar' ? 'text-primary-900 bg-primary-100' : ''
        "
      >
        <IconCalendar class="size-6" />
        <h3>Calendrier</h3>
      </div>
    </NuxtLink>
    <NuxtLink to="/parameters">
      <div
        class="flex flex-col items-center space-y-1 p-2 rounded-md transition-all duration-500 ease-in-out"
        :class="
          route.path === '/parameters' ? 'text-primary-900 bg-primary-100' : ''
        "
      >
        <IconSettings class="size-6" />
        <h3>Paramètres</h3>
      </div>
    </NuxtLink>
  </div>
</template>
