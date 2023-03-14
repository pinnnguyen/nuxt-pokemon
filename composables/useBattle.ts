const useBattle = defineStore('battle', () => {
  const battleTeams = ref()
  const emulators = ref()
  const teams = ref()

  const startWar = async (enemyId?: string, pokemonId?: string) => {
    const res: any = await $fetch('/api/battle', {
      method: 'POST',
      body: {
        enemyId,
        pokemonId,
        format: '1v1',
      },
    })

    if (res) {
      emulators.value = res.emulators
      teams.value = res.teams
    }
  }

  return {
    emulators,
    startWar,
    teams,
  }
})

export { useBattle as default }
