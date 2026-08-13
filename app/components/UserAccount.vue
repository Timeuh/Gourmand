<script lang="ts" setup>
const { user, loggedIn, clear } = useUserSession();
</script>

<template>
  <section>
    <h2>Compte</h2>
    <section v-if="loggedIn">
      <div>
        <NuxtImg :src="user?.picture" alt="image de profil" />
        <div>
          <h3>{{ user?.name }}</h3>
          <h4>{{ user?.email }}</h4>
        </div>
      </div>
      <div>
        <NuxtLink to="/api/auth/google">Changer de compte</NuxtLink>
        <button @click="clear">Se déconnecter</button>
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
        <NuxtLink to="/api/auth/google">Se connecter</NuxtLink>
      </div>
    </section>
  </section>
</template>
