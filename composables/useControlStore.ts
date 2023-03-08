export const useControlStore = defineStore('control', () => {
  const shouldPoList = ref(false)
  const setShouldPoList = (value: boolean) => {
    shouldPoList.value = value
  }

  return {
    shouldPoList,
    setShouldPoList,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useControlStore, import.meta.hot))
