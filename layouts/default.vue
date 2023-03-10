<script setup>
const { shouldPoList, shouldTraining } = storeToRefs(useControlStore())
</script>

<template>
  <PokemonList v-if="shouldPoList" />
  <Training v-if="shouldTraining" />
  <template v-if="!shouldPoList && !shouldTraining">
    <PageNavbar />
    <slot />
    <PageBottom />
  </template>
</template>
