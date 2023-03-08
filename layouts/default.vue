<script setup>
const toggleMyPokemon = useState('toggleMyPokemon', () => false)
</script>

<template>
  <div h-full>
    <PokemonMyPokemon v-if="toggleMyPokemon" />
    <template v-else>
      <PageNavbar />
      <slot />
      <PageBottom />
    </template>
  </div>
</template>
