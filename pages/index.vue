<script setup lang="ts">
const { playerInfo } = storeToRefs(usePlayerStore())
const { setShouldTraining } = useControlStore()

definePageMeta({
  middleware: ['game'],
  auth: false,
})
</script>

<template>
  <div h-full>
    <NuxtImg absolute w-full h-full src="/background/home.png" />
    <div absolute class="transform-center" w-full>
      <div class="flex items-center justify-center mb-4 gap-2">
        <div class="relative">
          <NuxtImg format="webp" class="w-[105px]" src="/background/pokemon_stand.png" />
          <NuxtImg
            v-if="playerInfo.pokemons[0]" class="absolute transform-center w-12 pb-4"
            :src="`/character/${playerInfo.pokemons[0].pokedex}.gif`"
          />
        </div>
        <div class="relative">
          <NuxtImg format="webp" class="w-[105px]" src="/background/pokemon_stand.png" />
          <NuxtImg
            v-if="playerInfo.pokemons[1]" class="absolute transform-center w-12 pb-4"
            :src="`/character/${playerInfo.pokemons[1].pokedex}.gif`"
          />
        </div>
      </div>
      <div class="flex items-center justify-center gap-2">
        <div class="relative">
          <NuxtImg format="webp" class="w-[105px]" src="/background/pokemon_stand.png" />
          <NuxtImg
            v-if="playerInfo.pokemons[1]" class="absolute transform-center w-12 pb-4"
            :src="`/character/${playerInfo.pokemons[1].pokedex}.gif`"
          />
        </div>
        <div class="relative">
          <NuxtImg format="webp" class="w-[105px]" src="/background/pokemon_stand.png" />
          <NuxtImg
            v-if="playerInfo.pokemons[1]" class="absolute transform-center w-12 pb-4"
            :src="`/character/${playerInfo.pokemons[1].pokedex}.gif`"
          />
        </div>
        <div class="relative">
          <NuxtImg format="webp" class="w-[105px]" src="/background/pokemon_stand.png" />
          <NuxtImg
            v-if="playerInfo.pokemons[1]" class="absolute transform-center w-12 pb-4"
            :src="`/character/${playerInfo.pokemons[1].pokedex}.gif`"
          />
        </div>
      </div>
      <div class="w-full text-center mt-4">
        <button class="button-yes" @click="setShouldTraining(true)">
          Huấn luyện
        </button>
      </div>
    </div>
  </div>
</template>
