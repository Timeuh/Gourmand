<script setup lang="ts"></script>

<template>
  <div
    class="space-y-4 bg-background-900 shadow-[0_0_2px_0] shadow-secondary-900/50 p-3 rounded-md w-full h-[60vh] xl:h-full overflow-auto text-secondary-900"
  >
    <FormPreptime ref-key="FoodsFormFilter" prefix="filter" />
    <FormPlates ref-key="FoodsFormFilter" prefix="filter" />
    <FormIngredients ref-key="FoodsIngredientsFilter" prefix="filter" />
  </div>
</template>
