<script lang="ts" setup>
const { pokemonList } = storeToRefs(usePlayerStore())
const { setShouldPoList } = useControlStore()
const { getPokemon } = usePokemon()
const { showDetail } = storeToRefs(usePokemon())
</script>

<template>
  <van-popup v-model:show="showDetail" class="!bg-black">
    <Suspense>
      <template #default>
        <PokemonDetail />
      </template>
      <template #fallback>
        <div>eheheh</div>
      </template>
    </Suspense>
  </van-popup>
  <div relative overflow-hidden>
    <div absolute top-5 h-20 px-2 cursor-pointer>
      <nuxt-img w-15 h-15 src="/icons/back.png" @click="setShouldPoList(false)" />
    </div>
    <nuxt-img src="/background/pokemon_catch.png" />
    <div class="absolute top-50 w-full h-[calc(100%_-_100px)] overflow-auto scrollbar-hide">
      <div class="grid grid-cols-3 gap-2 px-2">
        <LazyPokemonFrame
          v-for="pokemon in pokemonList"
          :key="pokemon._id" :pokemon="pokemon"
          @click="getPokemon(pokemon._id)"
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
  </div>
</template>
