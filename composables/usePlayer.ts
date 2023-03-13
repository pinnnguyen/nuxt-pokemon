export const usePlayerStore = defineStore('player', () => {
  const playerInfo = ref()
  const pokemonList = computed(() => playerInfo.value.pokemons)
  const trainings = computed(() => playerInfo.value.trainings)

  const getPlayer = async () => {
    const data = await $fetch('/api/player', {
      headers: (useRequestHeaders(['cookie']) as any),
    })

    if (!data)
      return navigateTo('/role')

    playerInfo.value = data
  }

  const createFigure = async (pokemonSelected: number) => {
    if (!pokemonSelected)
      showToast({ message: 'Vui lòng chọn pokemon khởi đầu', position: 'bottom' })

    playerInfo.value = await $fetch('/api/player/create-role', {
      method: 'POST',
      headers: (useRequestHeaders(['cookie']) as any),
      body: {
        pokedex: pokemonSelected,
      },
    })
    navigateTo('/')
  }

  return {
    createFigure,
    playerInfo,
    getPlayer,
    pokemonList,
    trainings,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePlayerStore, import.meta.hot))
