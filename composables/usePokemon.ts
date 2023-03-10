import { defineStore } from 'pinia'
export const usePokemon = defineStore('pokemon', () => {
  const firstPokemon = ref([])
  const pokemonDetail = ref()
  const showDetail = ref(false)

  const getFirstPokemon = async () => {
    firstPokemon.value = await $fetch('/api/pokemon', {
      method: 'POST',
      body: {
        pokedexs: [1, 4, 7],
      },
    })
  }

  const getPokemon = async (pokemonId: string) => {
    pokemonDetail.value = await $fetch('/api/pokemon/find', {
      method: 'GET',
      query: {
        pokemonId,
      },
    })

    showDetail.value = true
  }

  return {
    getPokemon,
    getFirstPokemon,
    firstPokemon,
    pokemonDetail,
    showDetail,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePlayerStore, import.meta.hot))
