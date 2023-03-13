import { formatPokemon, monsterSchema, playerPokemonSchema } from '~/server/schema'
import { randomIdNumber } from '~/utils'

interface onevone {
  enemyId: string
  pokemonId: string
}

export const handleWar = (pokemons: any, enemys: any) => {
  const getIdTeam1 = randomIdNumber()
  const getIdTeam2 = randomIdNumber()
  const teams = {
    [getIdTeam1]: {},
    [getIdTeam2]: {},
  }

  for (let i = 0; i < enemys.length; i++) {
    enemys[i] = {
      ...formatPokemon(enemys[i]),
      team: getIdTeam2,
    }

    teams[getIdTeam2] = {
      list: {
        [`${getIdTeam2}_${enemys[i]._id}`]: {
          info: enemys[i].info,
          hp: enemys[i].stats.hp.total,
        },
      },
    }
  }

  for (let i = 0; i < pokemons.length; i++) {
    pokemons[i] = {
      ...formatPokemon(pokemons[i]),
      team: getIdTeam1,
    }

    teams[getIdTeam1] = {
      list: {
        [`${getIdTeam1}_${pokemons[i]._id}`]: {
          info: pokemons[i].info,
          hp: pokemons[i].stats.hp.total,
        },
      },
    }
  }

  const allMembers = [...pokemons, ...enemys].sort((a, b) => a.stats.speed > b.stats.speed ? -1 : 1)
  let round = 0
  let endGame = false
  let winner = ''

  const emulators = []
  while (true) {
    round++

    const emulator = []
    for (let i = 0; i < allMembers.length; i++) {
      const attacker = allMembers[i]
      const defender = allMembers[i + 1] ?? allMembers[0]

      const attackerDamage = (attacker?.stats?.m_attack.total ?? 0) + (attacker?.stats?.p_attack.total ?? 0)
      const defenderDef = defender?.stats?.m_def.total + defender?.stats?.p_def.total
      const originDMG = Math.round(attackerDamage - defenderDef * 0.75)

      defender.stats.hp.total -= originDMG

      emulator.push({
        name: attacker.info.name,
        action: 'attack',
        critical: false,
        realtime: {
          [`${defender.team}_${defender._id}`]: {
            receiveDamage: originDMG,
          },
        },
        now: {
          mp: {
            [`${attacker.team}_${attacker._id}`]: 20,
          },
          hp: {
            [`${defender.team}_${defender._id}`]: defender.stats.hp.total,
          },
        },
      })

      endGame = defender.stats.hp.total <= 0 || attacker.stats.hp.total <= 0 || round > 10
      winner = attacker.stats.hp.total > 0 ? attacker.team : defender.team
    }

    emulators.push({
      [`0_${round}`]: emulator,
    })

    if (endGame) {
      return {
        winner,
        emulators,
        teams: {
          ...teams,
        },
      }
    }
  }
}

export const handle1v1Battle = async (body: onevone) => {
  const enemys = await monsterSchema.find({ _id: body.enemyId })
  if (!enemys) {
    return {
      success: false,
      message: 'Enemy not found',
    }
  }

  const pokemons = await playerPokemonSchema.find({ _id: body.pokemonId })
  if (!pokemons) {
    return {
      success: false,
      message: 'Pokemon not found',
    }
  }

  return handleWar(pokemons, enemys)
}
