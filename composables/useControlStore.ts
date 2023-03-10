export const useControlStore = defineStore('control', () => {
  const shouldPoList = ref(false)
  const shouldTraining = ref(false)
  const setShouldPoList = (value: boolean) => {
    shouldPoList.value = value
  }

  const setShouldTraining = (value: boolean) => {
    shouldTraining.value = value
  }

  return {
    shouldPoList,
    setShouldPoList,
    setShouldTraining,
    shouldTraining,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useControlStore, import.meta.hot))
