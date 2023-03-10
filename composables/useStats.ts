import type { BaseStats, StatsKey } from '~/types/pokemon'

const useStats = () => {
  const { getPokemon } = usePokemon()
  const prepareAddPoint = async (key: StatsKey, stat: Partial<BaseStats>, pokemonId: string) => {
    const res: any = await $fetch('/api/pokemon/stats', {
      method: 'POST',
      body: {
        action: 'stats_up',
        pokemon: pokemonId,
        stat: key,
      },
    })

    showToast({ message: res.message, position: 'bottom' })
    if (res.success)
      await getPokemon(pokemonId)
  }

  return {
    prepareAddPoint,
  }
}

export default useStats
