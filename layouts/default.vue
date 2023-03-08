<script setup>
const { shouldPoList } = storeToRefs(useControlStore())
</script>

<template>
  <PokemonList v-if="shouldPoList" />
  <template v-else>
    <PageNavbar />
    <slot />
    <PageBottom />
  </template>
</template>
