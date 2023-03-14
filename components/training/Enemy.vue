<script setup lang="ts">
const { poTraining } = storeToRefs(useTraining())
const { setView } = useTraining()
const { startWar } = useBattle()

const training = computed(() => poTraining.value?.info?.training ?? 1)
const { data: poTrainingEnemy, pending } = useFetch('/api/training/monster', {
  query: {
    level: training.value * 10,
  },
})

const start = async () => {
  await startWar(poTrainingEnemy.value?._id, poTraining.value?._id)
  setView('battle')
}
</script>

<template>
  <div absolute class="absolute top-9/12 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <button class="button-yes" @click="start">
      KHIÊU CHIẾN
    </button>
  </div>
  <div v-if="!pending" absolute class="top-[20%] transform-center">
    <LazyPokemonFrame>
      <template #avatar>
        <NuxtImg
          :src="`/character/${poTrainingEnemy.info.pokedex}.gif`"
          class="top-0 h-12"
        />
      </template>
      <template #name>
        {{ poTrainingEnemy.info.name }}
      </template>
      <template #cp>
        CP {{ Math.round(poTrainingEnemy?.info?.cp) ?? 0 }}
      </template>
      <template #level>
        lv.{{ poTrainingEnemy?.training?.level }}
      </template>
      <template #element>
        <NuxtImg v-for="e in poTrainingEnemy.element" :key="e" :src="`/elements/${e}.png`" format="webp" class="h-4" />
      </template>
    </LazyPokemonFrame>
  </div>
</template>
