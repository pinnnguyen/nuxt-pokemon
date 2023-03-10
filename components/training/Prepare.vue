<script setup lang="ts">
const { setPoTraining } = useTraining()
const { pokemonList } = storeToRefs(usePlayerStore())
const { showList, poTraining } = storeToRefs(useTraining())
</script>

<template>
  <div v-if="showList" class="absolute top-0 bg-black/90 z-9 w-full h-full overflow-auto scrollbar-hide">
    <div absolute top-5 right-5 h-12 w-12 bg-yellow-700 rounded-full flex items-center justify-center>
      <Icon name="ic:baseline-close" size="35" color="white" @click="showList = false" />
    </div>
    <div class="grid grid-cols-3 gap-2 pt-50 px-2">
      <LazyPokemonFrame
        v-for="pokemon in pokemonList"
        :key="pokemon._id" :pokemon="pokemon"
        @click="setPoTraining(pokemon)"
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
          CP {{ Math.round(pokemon?.info?.cp) ?? 0 }}
        </template>
        <template #level>
          lv.{{ pokemon?.training?.level }}
        </template>
        <template #element>
          <NuxtImg v-for="e in pokemon.element" :key="e" :src="`/elements/${e}.png`" format="webp" class="h-4" />
        </template>
      </LazyPokemonFrame>
    </div>
  </div>

  <div absolute class="transform-center">
    <div class="relative" mb-60>
      <img src="/_ipx/f_webp/background/pokemon_stand.png" w-30>
      <img src="/_ipx/_/character/4.gif" data-nuxt-img="" class="absolute transform-center w-12 pb-4">
    </div>

    <div class="relative">
      <img src="/_ipx/f_webp/background/pokemon_stand.png" w-30>
      <NuxtImg v-if="poTraining.pokedex" :src="`/character/${poTraining.pokedex}.gif`" data-nuxt-img="" class="absolute transform-center w-12 pb-4" />
      <NuxtImg v-else src="/common/training_select.png" data-nuxt-img="" class="absolute transform-center w-12 pb-4" @click="showList = true" />
    </div>
  </div>
</template>
