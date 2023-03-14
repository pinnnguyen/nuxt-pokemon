<script setup lang="ts">
const { isTrainingView, isPrepareView, isEnemy, isBattle } = storeToRefs(useTraining())

const component = computed(() => {
  if (isTrainingView.value)
    return resolveComponent('TrainingList')
  if (isPrepareView.value)
    return resolveComponent('TrainingPrepare')
  if (isEnemy.value)
    return resolveComponent('TrainingEnemy')
  if (isBattle.value)
    return resolveComponent('Battle')
})
</script>

<template>
  <div relative h-full>
    <NuxtImg h-full format="webp" src="/background/battle.png" />
    <TrainingBottomControl />
    <component :is="component" />
  </div>
</template>
