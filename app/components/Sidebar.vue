<script setup lang="ts">
// get current route path
const route = useRoute();

// get user session to display the correct links based on the logged in state
const { loggedIn, user } = useUserSession();
</script>

<template>
  <nav
    class="hidden left-0 z-10 relative xl:flex flex-col items-center space-y-12 bg-background-900 shadow-[0_0_4px_0] shadow-secondary-900/50 p-4 w-1/6 h-screen text-secondary-900 text-lg select-none"
  >
    <div
      class="flex flex-row justify-center items-center space-x-4 pt-10 w-full"
    >
      <NuxtImg
        src="/assets/app_icon.png"
        alt="Logo Gourmand"
        width="50"
        height="50"
      />
      <h2 class="font-bold text-2xl">Gourmand</h2>
    </div>
    <div class="flex flex-col items-center space-y-6 w-full">
      <NuxtLink
        :to="loggedIn ? '/' : undefined"
        class="w-full h-12"
        :class="{
          'opacity-50 cursor-not-allowed': !loggedIn,
        }"
      >
        <div
          class="flex flex-row items-center space-x-3 p-2 rounded-xl h-full transition-all duration-500 ease-in-out"
          :class="route.path === '/' ? 'text-primary-900 bg-primary-100' : ''"
        >
          <IconHouse class="size-6" />
          <h3>Accueil</h3>
        </div>
      </NuxtLink>
      <NuxtLink
        :to="loggedIn ? '/foods' : undefined"
        class="w-full h-12"
        :class="{
          'opacity-50 cursor-not-allowed': !loggedIn,
        }"
      >
        <div
          class="flex flex-row items-center space-x-3 p-2 rounded-xl h-full transition-all duration-500 ease-in-out"
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
        :class="{
          'opacity-50 cursor-not-allowed': !loggedIn,
        }"
        class="w-full h-12"
      >
        <div
          class="flex flex-row items-center space-x-3 p-2 rounded-xl h-full transition-all duration-500 ease-in-out"
          :class="
            route.path === '/calendar' ? 'text-primary-900 bg-primary-100' : ''
          "
        >
          <IconCalendar class="size-6" />
          <h3>Calendrier</h3>
        </div>
      </NuxtLink>
      <NuxtLink
        to="/parameters"
        class="w-full h-12"
        :class="{
          'opacity-50 cursor-not-allowed': !loggedIn,
        }"
      >
        <div
          class="flex flex-row items-center space-x-3 p-2 rounded-xl h-full transition-all duration-500 ease-in-out"
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
    </div>
    <NuxtLink
      to="parameters"
      class="bottom-10 absolute flex flex-row items-center space-x-4 ps-10 w-full cursor-pointer"
    >
      <NuxtImg
        v-if="user?.picture"
        :src="user?.picture"
        alt="image de profil"
        width="50"
        height="50"
        class="shadow-[0_2px_4px_0] shadow-secondary-900/50 rounded-full overflow-hidden"
      />
      <div
        v-if="!user?.picture"
        class="flex flex-col justify-center items-center bg-background-500 shadow-[0_2px_4px_0] shadow-secondary-900/50 rounded-full size-12.5 shrink-0"
      >
        <IconUser class="size-6" />
      </div>
      <h2>{{ user?.name || "Connectez-vous pour commencer" }}</h2>
    </NuxtLink>
    <div class="bottom-2 absolute text-sm">
      <Footer />
    </div>
  </nav>
</template>
