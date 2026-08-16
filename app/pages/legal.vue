<script lang="ts" setup>
useHead({
  title: "Gourmand - Mentions légales",
});
</script>

<template>
  <main
    id="legal-page"
    class="space-y-6 bg-background-500 p-6 pb-[12vh] xl:pb-6 w-full xl:w-5/6 overflow-hidden text-secondary-900 select-none"
  >
    <article
      class="space-y-3 bg-background-900 shadow-[0_2px_2px_0] shadow-secondary-900/50 p-3 rounded-lg xl:w-3/5"
    >
      <section>
        <h1 class="font-bold text-xl">Mentions légales</h1>
        <p class="text-md text-secondary-500">
          Dernière mise à jour : 16 août 2026
        </p>
      </section>
      <section class="space-y-1">
        <h2 class="font-bold text-lg">Éditeur</h2>
        <p>
          Gourmand est un projet personnel édité à titre non professionnel par
          <strong>Timeuh</strong>.
        </p>
        <p>
          Conformément à l'article 6 III-2 de la loi n° 2004-575 du 21 juin 2004
          pour la confiance dans l'économie numérique, l'éditeur, personne
          physique éditant le service à titre non professionnel, a communiqué
          ses éléments d'identification à son hébergeur et ne les tient pas à la
          disposition du public afin de préserver son anonymat.
        </p>
        <p>
          Pour toute question concernant Gourmand, vous pouvez contacter
          l'éditeur à l'adresse suivante :
        </p>
        <NuxtLink
          to="https://github.com/Timeuh/Gourmand/issues"
          class="font-bold text-primary-900 hover:underline"
        >
          Page des issues Github
        </NuxtLink>
      </section>
      <section class="space-y-1">
        <h2 class="font-bold text-lg">Hébergement</h2>
        <p>Gourmand est hébergé par :</p>
        <address>
          <strong>Contabo GmbH</strong><br />
          Welfenstrasse 22<br />
          81549 München<br />
          Allemagne
        </address>
      </section>
      <section class="space-y-1">
        <h2 class="font-bold text-lg">Propriété intellectuelle</h2>
        <p>
          Le code, la présentation et les éléments propres à Gourmand sont
          protégés par les dispositions applicables en matière de propriété
          intellectuelle, sauf indication contraire.
        </p>
        <p>
          Les contenus ajoutés par les utilisateurs, notamment les images et
          informations relatives à leurs plats, restent sous la responsabilité
          de leurs auteurs.
        </p>
      </section>
      <section class="space-y-1">
        <h2 class="font-bold text-lg">Responsabilité</h2>
        <p>Gourmand est un projet personnel fourni gratuitement.</p>
        <p>
          L'application est proposée telle quelle, sans garantie de
          disponibilité permanente ni d'absence d'erreur. Des interruptions
          peuvent notamment survenir pour des raisons de maintenance, de
          sécurité ou liées à l'infrastructure d'hébergement.
        </p>
        <p>
          Gourmand est un outil d'organisation et de planification des repas. Il
          ne constitue pas un service médical, nutritionnel ou professionnel de
          santé.
        </p>
        <p>
          Les utilisateurs sont responsables des informations et contenus qu'ils
          ajoutent à l'application.
        </p>
      </section>
      <section class="space-y-1">
        <h2 class="font-bold text-lg">Contact</h2>
        <p>
          Pour toute question relative au fonctionnement de Gourmand ou à ces
          mentions légales :
        </p>
        <NuxtLink
          to="https://github.com/Timeuh/Gourmand/issues"
          class="font-bold text-primary-900 hover:underline"
        >
          Page des issues Github
        </NuxtLink>
      </section>
    </article>
  </main>
</template>
