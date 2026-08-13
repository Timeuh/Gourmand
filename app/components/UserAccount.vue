<script lang="ts" setup>
const { user, loggedIn, clear } = useUserSession();
</script>

<template>
  <section
    class="flex flex-col items-center space-y-4 bg-background-900 shadow-[0_1px_2px_0] shadow-secondary-900/50 p-8 rounded-xl w-full text-secondary-900"
  >
    <h2 class="font-bold text-2xl">Compte</h2>
    <section v-if="loggedIn" class="space-y-8 w-full">
      <div class="flex flex-row items-center space-x-4 w-full">
        <NuxtImg
          :src="user?.picture"
          alt="image de profil"
          class="shadow-[0_1px_2px_0] shadow-secondary-900/50 rounded-full size-24"
        />
        <div>
          <h3 class="font-bold">{{ user?.name }}</h3>
          <h4 class="text-md text-secondary-500">{{ user?.email }}</h4>
        </div>
      </div>
      <div class="flex flex-col items-center space-y-4 w-full text-center">
        <a
          href="/api/auth/google"
          class="flex flex-row justify-center items-center space-x-2 bg-background-500 shadow-[0_1px_2px_0] shadow-secondary-900/50 rounded-xl w-full h-12"
        >
          <IconSwitchAccount class="size-6" />
          <h4 class="text-lg">Changer de compte</h4>
        </a>
        <button
          @click="clear"
          class="flex flex-row justify-center items-center space-x-2 bg-primary-900 shadow-[0_1px_2px_0] shadow-secondary-900/50 rounded-xl w-full h-12 text-background-900"
        >
          <IconDisconnect class="size-6" />
          <h4 class="text-lg">Se déconnecter</h4>
        </button>
      </div>
    </section>
    <section v-else>
      <div>
        <NuxtImg src="" alt="" />
        <div>
          <h3>Invité</h3>
          <h4>john.doe@mail.com</h4>
        </div>
      </div>
      <div>
        <a href="/api/auth/google">Se connecter</a>
      </div>
    </section>
  </section>
</template>
