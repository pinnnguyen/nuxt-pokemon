<script setup lang="ts">
const { isTrainingView, isPrepareView, isEnemy } = storeToRefs(useTraining())
</script>

<template>
  <div relative h-full>
    <NuxtImg h-full format="webp" src="/background/battle.png" />
    <TrainingBottomControl />
    <trainingList v-if="isTrainingView" />
    <TrainingPrepare v-if="isPrepareView" />
    <TrainingEnemy v-if="isEnemy" />
  </div>
</template>
