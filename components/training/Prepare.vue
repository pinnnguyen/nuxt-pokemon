<script setup lang="ts">
const { setPoTraining, setShowList } = useTraining()
const { pokemonList } = storeToRefs(usePlayerStore())
const { showList, poTraining } = storeToRefs(useTraining())

const { data: poTrainingEnemyDefault, pending } = useFetch('/api/training/monster', {
  query: {
    level: 10,
  },
})
</script>

<template>
  <div v-if="showList" class="absolute top-0 bg-black/90 z-9 w-full h-full overflow-auto scrollbar-hide">
    <div absolute top-5 right-5 h-12 w-12 bg-yellow-700 rounded-full flex items-center justify-center>
      <Icon name="ic:baseline-close" size="35" color="white" @click="setShowList(false)" />
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
  <div v-if="!pending" absolute class="transform-center">
    <div class="relative" flex items-center justify-center h-50 w-50 mb-20>
      <NuxtImg format="webp" src="/background/pokemon_stand.png" w-30 />
      <NuxtImg v-if="poTrainingEnemyDefault?.info?.pokedex" :src="`/character/${poTrainingEnemyDefault?.info?.pokedex}.gif`" class="absolute transform-center max-w-12 pb-6" />
    </div>
    <div class="relative" flex items-center justify-center h-50 w-50>
      <NuxtImg format="webp" src="/background/pokemon_stand.png" w-30 />
      <NuxtImg v-if="poTraining?.info?.pokedex" :src="`/character/${poTraining?.info?.pokedex}.gif`" class="absolute transform-center max-w-12 pb-6" />
      <NuxtImg v-else src="/common/training_select.png" class="absolute transform-center w-12 pb-4" @click="setShowList(true)" />
    </div>
  </div>
</template>
