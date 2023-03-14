import { formatPokemon, monsterSchema, playerPokemonSchema } from '~/server/schema'
import { randomIdNumber } from '~/utils'

interface onevone {
  enemyId: string
  pokemonId: string
}

export const handleWar = async (pokemons: any, enemys: any, format: 'solo' | '5v5') => {
  const getIdTeam1 = randomIdNumber()
  const getIdTeam2 = randomIdNumber()
  const teams: Record<string, any> = {
    [getIdTeam1]: {},
    [getIdTeam2]: {},
  }

  for (let i = 0; i < enemys.length; i++) {
    enemys[i] = {
      ...formatPokemon(enemys[i]),
      team: getIdTeam2,
    }

    teams[getIdTeam2] = {
      teamPosition: 2,
      list: {
        [`${getIdTeam2}_${enemys[i]._id}`]: {
          _id: enemys[i]._id,
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
      teamPosition: 1,
      list: {
        [`${getIdTeam1}_${pokemons[i]._id}`]: {
          _id: pokemons[i]._id,
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
        emuId: `${attacker.team}_${attacker._id}`,
        name: attacker.info.name,
        action: 'attack',
        critical: false,
        receive: {
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
      const teamWin = teams[winner]
      const teamPos = teamWin.teamPosition

      if (format === 'solo' && teamPos === 1) {
        for (const k in teamWin.list) {
          const pokemonId = teamWin.list[k]._id
          if (!pokemonId)
            break

          console.log('you win', pokemonId)
          await playerPokemonSchema.findByIdAndUpdate(pokemonId, {
            $inc: {
              'info.training': 1,
            },
          })
        }
      }

      return {
        winner,
        format,
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

  return handleWar(pokemons, enemys, 'solo')
}
