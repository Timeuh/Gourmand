<script lang="ts" setup>
// get user session utils
const { user, loggedIn, clear } = useUserSession();

// get account deletion utils from composable
const { deleteAccount, retrieveAccount } = useAccountDeletion();

// logout and refresh session
async function logout() {
  await navigateTo("login");
  clear();
}
</script>

<template>
  <section
    class="flex flex-col items-center space-y-4 bg-background-900 shadow-[0_1px_2px_0] shadow-secondary-900/50 px-8 py-6 rounded-xl w-full xl:w-1/2 xl:min-h-[24vh] text-secondary-900"
  >
    <h2 class="font-bold text-2xl">Compte</h2>
    <section
      v-if="loggedIn"
      class="xl:flex flex-row items-center space-y-8 xl:space-y-0 w-full"
    >
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
        <button
          @click="logout"
          class="flex flex-row justify-center items-center space-x-2 bg-secondary-100 hover:bg-secondary-900 shadow-[0_1px_2px_0] shadow-secondary-900/50 rounded-xl w-full h-12 hover:text-background-900 transition duration-300 ease-in-out"
        >
          <IconDisconnect class="size-6" />
          <h4 class="text-lg">Se déconnecter</h4>
        </button>
        <button
          v-if="user?.deletion_requested_at == null"
          @click="deleteAccount"
          class="flex flex-row justify-center items-center space-x-2 bg-primary-900 hover:bg-primary-100 shadow-[0_1px_2px_0] shadow-secondary-900/50 rounded-xl w-full h-12 text-background-900 hover:text-primary-900 transition duration-300 ease-in-out cursor-pointer"
        >
          <IconTrash class="size-6" />
          <h4 class="text-lg">Supprimer le compte</h4>
        </button>
        <button
          v-else
          @click="retrieveAccount"
          class="flex flex-row justify-center items-center space-x-2 bg-primary-900 hover:bg-primary-100 shadow-[0_1px_2px_0] shadow-secondary-900/50 rounded-xl w-full h-12 text-background-900 hover:text-primary-900 transition duration-300 ease-in-out cursor-pointer"
        >
          <IconSwitchAccount class="size-6" />
          <h4 class="text-lg">Réactiver le compte</h4>
        </button>
      </div>
    </section>
    <section
      v-else
      class="xl:flex flex-row items-center space-y-8 xl:space-y-0 w-full"
    >
      <div class="flex flex-row items-center space-x-4 w-full">
        <div
          class="flex flex-col justify-center items-center bg-background-500 shadow-[0_2px_4px_0] shadow-secondary-900/50 rounded-full size-24 shrink-0"
        >
          <IconUser class="size-10" />
        </div>
        <div class="xl:max-w-4/6">
          <h3 class="font-bold">Vous n'êtes pas connecté</h3>
          <h4 class="text-md text-secondary-500">
            Connectez-vous pour commencer
          </h4>
        </div>
      </div>
      <a
        href="/api/auth/google"
        class="flex flex-row justify-center items-center space-x-2 bg-secondary-100 hover:bg-secondary-900 shadow-[0_1px_2px_0] shadow-secondary-900/50 rounded-xl w-full h-12 hover:text-secondary-100 transition duration-300 ease-in-out"
      >
        <NuxtImg
          src="/assets/google_icon.png"
          alt="logo de google"
          class="size-6"
        />
        <h4 class="text-lg">Se connecter</h4>
      </a>
    </section>
  </section>
</template>
