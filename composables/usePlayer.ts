export const usePlayerStore = defineStore('player', () => {
  const playerInfo = ref()
  const pokemonList = computed(() => playerInfo.value.pokemons)
  const loadPlayer = (data: any) => {
    playerInfo.value = data
  }

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

    const role = await $fetch('/api/player/create-role', {
      method: 'POST',
      headers: (useRequestHeaders(['cookie']) as any),
      body: {
        pokedex: pokemonSelected,
      },
    })

    loadPlayer(role)
    navigateTo('/')
    return role
  }

  return {
    createFigure,
    playerInfo,
    getPlayer,
    loadPlayer,
    pokemonList,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePlayerStore, import.meta.hot))
