<script setup lang="ts">
import type { Pokemon } from '~/types/pokemon'

const { setView, setPoTraining } = useTraining()
const { trainingList } = storeToRefs(useTraining())

const remainSlot = computed(() => {
  if (!trainingList.value)
    return 5

  return 5 - trainingList.value.length
})

const handleHasPo = (pokemon: Partial<Pokemon>) => {
  setView('prepare')
  setPoTraining(pokemon)
}
</script>

<template>
  <div absolute class="transform-center" gap-4 flex flex-col>
    <template v-if="trainingList && trainingList.length > 0">
      <div
        v-for="(t, i) in trainingList" :key="i" h-18 rounded-full bg-dark-400 w-80 flex items-center px-2 gap-4
        @click="handleHasPo(t)"
      >
        <div h-16 rounded-full bg-black flex text-white items-center justify-between w-full text-16 px-4>
          <NuxtImg :src="`/character/${t.info.pokedex}.gif`" />
          <p class="xp">
            HL {{ t.info.training }} - <span text-yellow-400>{{ t.info.training * 25 }}xp/phút</span>
          </p>
        </div>
      </div>
    </template>
    <div
      v-for="i in remainSlot" :key="i" h-18 rounded-full bg-dark-400 w-80 flex items-center px-2 gap-4
      @click="setView('prepare', i)"
    >
      <div h-16 rounded-full w-12 bg-black />
      <div text-18 font-bold text-yellow-400>
        Chưa chọn
      </div>
    </div>
  </div>
</template>
