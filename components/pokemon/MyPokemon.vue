<script lang="ts" setup>
const { playerInfo, pokemons } = storeToRefs(usePlayerStore())

const selectedPokemon = ref()
const togglePokemonDetail = ref(false)
const onSelected = (pokemon) => {
  selectedPokemon.value = pokemon
  togglePokemonDetail.value = true
}
</script>

<template>
  <van-popup v-model:show="togglePokemonDetail" class="!bg-black">
    <div class="w-[60vh] m-auto bg-white p-4 border-4 border-[#9C7A54]">
      <div mb-2>
        <div class="flex justify-around">
          <div>
            <nuxt-img :src="`/character/${selectedPokemon.pokedex}.gif`" />
          </div>
          <div>
            <p text-16 text-blue-500 font-extrabold>
              {{ selectedPokemon.info.name }}
            </p>
          </div>
          <div class="w-[80px] h-[80px] bg-black rounded">
            <nuxt-img src="/level/0.png" />
          </div>
          <div flex flex-col items-end gap-1>
            <p flex gap-1>
              <nuxt-img v-for="element in selectedPokemon.element" :key="element" class="w-[35px] h-[35px]" format="webp" :src="`/elements/${element}.png`" />
            </p>
            <p>
              <nuxt-img class="w-[35px] h-[35]px" format="webp" :src="`/elements/${selectedPokemon.info.role}.png`" />
            </p>
          </div>
        </div>
        <div flex justify-between items-center gap-4>
          <div w-full>
            <div flex justify-between>
              <div>
                <span>
                  LEVEL 48
                </span>
                <span class="text-[#aaa]">
                  (Tiến hóa)
                </span>
              </div>
              <div>
                24,003/30,311
              </div>
            </div>
            <div class="bg-[#1C1C1C99] rounded-3xl h-4">
              <div class="bg-[#FCD95F]" />
            </div>
          </div>
          <div flex w-25>
            <div flex items-center justify-center h-13 absolute text-16 text-white font-extrabold>
              Level UP
            </div>
            <NuxtImg w-full h-13 format="webp" src="/common/pokemon_level_up.png" />
          </div>
        </div>
      </div>
    </div>
    <div class="w-full bg-white p-4 border-4 border-[#9C7A54] mt-4">
      <div v-for="i in 10" flex items-center justify-between w-full h-12 text-16>
        <div flex>
          <span mr-1>Sát thương vật lý</span>
          <span>0.871</span>
        </div>
        <div flex gap-1>
          <span>24.6%</span>
          <NuxtImg mr-1 h-5 src="/common/pokemon_stats_right.png" />
          <span text-green-500>1,2121</span>
          <Icon name="ic:baseline-add-circle" color="#9C7A54" size="26" />
        </div>
      </div>
    </div>
  </van-popup>

  <div class="relative">
    <nuxt-img src="/background/pokemon_catch.png" />
    <div class="absolute top-50 w-full h-[calc(100%_-_100px)] overflow-auto scrollbar-hide">
      <div class="grid grid-cols-3 gap-2 px-2">
        <LazyPokemonFrame
          v-for="pokemon in pokemons"
          :key="pokemon._id" :pokemon="pokemon"
          @click="onSelected(pokemon)"
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
          <template #level>
            lv.{{ pokemon.info.level }}
          </template>
          <template #element>
            <NuxtImg v-for="e in pokemon.element" :key="e" :src="`/elements/${e}.png`" format="webp" class="h-4" />
          </template>
        </LazyPokemonFrame>
      </div>
    </div>
  </div>
</template>
