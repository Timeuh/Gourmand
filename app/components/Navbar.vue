<script setup lang="ts">
// get current route path
const route = useRoute();

// get user session to display the correct links based on the logged in state
const { loggedIn, user } = useUserSession();
</script>

<template>
  <nav
    class="xl:hidden bottom-0 z-10 fixed flex flex-row justify-between items-center bg-background-900 shadow-[0_0_4px_0] shadow-secondary-900/25 p-4 w-full h-22 text-secondary-900"
  >
    <button
      class="group w-1/5"
      :disabled="!loggedIn || user?.deletion_requested_at !== null"
    >
      <NuxtLink
        :to="loggedIn ? '/' : undefined"
        class="group-disabled:opacity-50 w-full"
      >
        <div
          class="flex flex-col items-center space-y-1 p-2 rounded-md w-full transition-all duration-500 ease-in-out"
          :class="route.path === '/' ? 'text-primary-900 bg-primary-100' : ''"
        >
          <IconHouse class="size-6" />
          <h3>Accueil</h3>
        </div>
      </NuxtLink>
    </button>
    <button
      class="group w-1/5"
      :disabled="!loggedIn || user?.deletion_requested_at !== null"
    >
      <NuxtLink
        :to="loggedIn ? '/foods' : undefined"
        class="group-disabled:opacity-50 w-full"
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
    </button>
    <button
      class="group"
      :disabled="!loggedIn || user?.deletion_requested_at !== null"
    >
      <NuxtLink
        :to="loggedIn ? '/calendar' : undefined"
        class="group-disabled:opacity-50 w-full"
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
    </button>
    <button class="group" :disabled="!loggedIn">
      <NuxtLink to="/parameters" class="group-disabled:opacity-50 w-full">
        <div
          class="flex flex-col items-center space-y-1 p-2 rounded-md transition-all duration-500 ease-in-out"
          :class="
            route.path === '/parameters'
              ? 'text-primary-900 bg-primary-100'
              : ''
          "
        >
          <IconSettings class="size-6" />
          <h3>Paramètres</h3>
        </div>
      </NuxtLink>
    </button>
  </nav>
</template>
