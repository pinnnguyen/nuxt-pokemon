import { defineStore } from 'pinia'
import type { Pokemon } from '~/types/pokemon'

const useTraining = defineStore('training', () => {
  const view = ref('training')
  const showList = ref(false)
  const position = ref(0)

  const { setShouldTraining } = useControlStore()

  const poTraining = ref<Partial<Pokemon>>({})
  const isTrainingView = computed(() => view.value === 'training')
  const isPrepareView = computed(() => view.value === 'prepare')
  const isEnemy = computed(() => view.value === 'enemy')

  const { data: trainingList } = useFetch<Pokemon[]>('/api/training/list')

  const selectedPos = async () => {
    await $fetch('/api/training/position', {
      method: 'POST',
      body: {
        pokemonId: poTraining.value._id,
        pos: position.value,
      },
    })
  }

  const setPoTraining = async (value: Partial<Pokemon>) => {
    showList.value = false
    poTraining.value = value

    await selectedPos()
  }

  const setShowList = (value: boolean) => {
    showList.value = value
  }

  const setShouldTrainingStep = () => {
    if (view.value === 'enemy')
      return view.value = 'training'

    if (view.value === 'prepare')
      return view.value = 'training'

    return setShouldTraining(false)
  }

  const setView = (value: string, pos?: number) => {
    view.value = value

    if (pos)
      position.value = pos
  }

  return {
    setView,
    isEnemy,
    isPrepareView,
    isTrainingView,
    trainingList,
    setPoTraining,
    showList,
    setShowList,
    poTraining,
    setShouldTrainingStep,
  }
})

export { useTraining as default }
