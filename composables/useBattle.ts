const useBattle = () => {
  const startWar = async (enemyId: string, pokemonId: string) => {
    console.log('enemyId', enemyId)
    console.log('pokemonId', pokemonId)
    await $fetch('/api/battle', {
      method: 'POST',
      body: {
        enemyId,
        pokemonId,
        format: '1v1',
      },
    })
  }

  return {
    startWar,
  }
}

export { useBattle as default }
