import { defineStore } from 'pinia'
import type { Pokemon } from '~/types/pokemon'

export const useTraining = defineStore('training', () => {
  const view = ref('training')
  const showList = ref(false)
  const poTraining = ref({})

  const isTrainingView = computed(() => view.value === 'training')
  const isPrepareView = computed(() => view.value === 'prepare')

  const setPoTraining = (value: Pokemon) => {
    showList.value = false
    poTraining.value = value
  }

  const setView = (value: string) => {
    view.value = value
  }

  return {
    setView,
    isPrepareView,
    isTrainingView,
    setPoTraining,
    showList,
    poTraining,
  }
})
