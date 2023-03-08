<script setup lang='ts'>
definePageMeta({
  middleware: ['role'],
  layout: 'auth',
})

const pokemonSelected = ref()
const { getFirstPokemon } = usePokemon()
const { createFigure } = usePlayerStore()
const { firstPokemon } = storeToRefs(usePokemon())
getFirstPokemon()
const handleCreateFigure = async () => {
  const role = await createFigure(pokemonSelected.value?.info?.pokedex)
  if (role)
    navigateTo('/')
}
</script>

<template>
  <div class="h-full w-full absolute top-0">
    <nuxt-img class="" src="/background/catch.png" format="webp" />
    <div class="absolute top-[10%] w-full text-center text-white">
      <h1 class="text-xl uppercase">
        Pokemon
      </h1>
      <p class="text-base mt-1 uppercase">
        Chọn pokemon khởi đầu của bạn
      </p>
    </div>
    <div v-if="firstPokemon" class="transform-center absolute grid grid-cols-3 w-full gap-1 p-1">
      <PokemonFrame
        v-for="pokemon in firstPokemon"
        :key="pokemon._id"
        :class="{
          'filter grayscale': pokemonSelected?.info?.pokedex !== pokemon.info.pokedex,
        }"
        @click="pokemonSelected = pokemon"
      >
        <template #avatar>
          <NuxtImg
            :src="`/character/${pokemon.info.pokedex}.gif`"
            class="top-0 h-12"
          />
        </template>
        <template #name>
          {{ pokemon.info.name }}
        </template>
        <template #cp>
          CP {{ pokemon.info.cp }}
        </template>
        <template #element>
          <NuxtImg v-for="e in pokemon.element" :key="e" :src="`/elements/${e}.png`" format="webp" class="h-4" />
        </template>
      </PokemonFrame>
    </div>
    <div class="absolute bottom-[20%] w-full text-center">
      <button class="button-yes" @click="handleCreateFigure">
        Chọn
      </button>
    </div>
  </div>
</template>
