<script setup lang="ts">
const { isPrepareView, poTraining } = storeToRefs(useTraining())
const { setShouldTrainingStep, setView } = useTraining()
</script>

<template>
  <div w-full absolute flex items-start justify-between top-5 h-20 px-4 cursor-pointer>
    <NuxtImg format="webp" w-15 h-15 src="/icons/back.png" @click="setShouldTrainingStep" />
    <template v-if="isPrepareView">
      <div v-if="poTraining" relative>
        <NuxtImg w-30 format="webp" object-cover src="/common/training_floor.png" />
        <span absolute class="transform-center" font-extrabold text-18>Lv.{{ poTraining?.info.training }}</span>
      </div>
      <div v-if="poTraining" relative class="invisible" :class="{ '!visible': poTraining?.info }">
        <NuxtImg h-23 format="webp" object-cover src="/common/training_floor_up.png" />
        <span absolute class="transform-center top-[45%]" font-extrabold text-20 text-white @click="setView('enemy')">
          Lv.{{ poTraining?.info.training + 1 }}</span>
      </div>
    </template>
  </div>
</template>
