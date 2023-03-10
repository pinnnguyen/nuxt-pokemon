<script setup lang="ts">
const { setShouldTraining } = useControlStore()

const { setView } = useTraining()
const { isTrainingView, isPrepareView } = storeToRefs(useTraining())
</script>

<template>
  <div relative>
    <div absolute top-5 h-20 px-2 cursor-pointer>
      <nuxt-img w-15 h-15 src="/icons/back.png" @click="setShouldTraining(false)" />
    </div>

    <nuxt-img src="/background/battle.png" />
    <TrainingPrepare v-if="isPrepareView" />

    <div v-if="isTrainingView" absolute class="transform-center" gap-4 flex flex-col>
      <div h-15 rounded-full bg-dark-400 w-80 flex items-center px-2 gap-4 @click="setView('prepare')">
        <div h-12 rounded-full w-12 bg-black />
        <div text-18 font-bold text-yellow-400>
          Chưa chọn
        </div>
      </div>
      <div h-15 rounded-full bg-dark-400 w-80 />
      <div h-15 rounded-full bg-dark-400 w-80 />
      <div h-15 rounded-full bg-dark-400 w-80 />
    </div>
  </div>
</template>
