export const usePokemon = defineStore('pokemon', () => {
  const firstPokemon = ref([])
  const getFirstPokemon = async () => {
    firstPokemon.value = await $fetch('/api/pokemon', {
      method: 'POST',
      body: {
        pokedexs: [1, 4, 7],
      },
    })
  }

  return {
    getFirstPokemon,
    firstPokemon,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePlayerStore, import.meta.hot))
