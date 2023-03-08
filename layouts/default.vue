<script setup>
const toggleMyPokemon = useState('toggleMyPokemon', () => false)
</script>

<template>
  <PokemonMyPokemon v-if="toggleMyPokemon" />
  <template v-else>
    <PageNavbar />
    <slot />
    <PageBottom />
  </template>
</template>
