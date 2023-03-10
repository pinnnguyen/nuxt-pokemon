import mongoose from 'mongoose'
import { PLAYER_POKEMON_SCHEMA } from '~/server/constant'
import { cloneDeep, randomNumber, roundNumber } from '~/utils'
import { PokemonInfoSchema } from '~/server/schema/pokemon.info'
import type { Pokemon } from '~/types/pokemon'
import { DEFAULT_EXP_LEVEL, statsToCP } from '~/game-config'

const schema = new mongoose.Schema<Pokemon>(
  {
    _id: {
      type: String,
    },
    sid: String,
    pokedex: Number,
    info: {},
    stats: {},
    element: [],
    skill: {},
    element_bonus: {},
    training: {},
  },
  {
    timestamps: true,
  },
)

schema.index({ pokedex: -1 }, { unique: true })
schema.index({ username: -1 })
export const PlayerPokemonSchema = mongoose.model('PlayerPokemonSchema', schema, PLAYER_POKEMON_SCHEMA)

export const formatPokemonInfo = async (pokemon: Pokemon) => {
  const poke = cloneDeep(pokemon)

  let newCP = 0
  const nStats: any = {}
  for (const stat in pokemon.stats) {
    newCP += statsToCP[stat] * (pokemon.stats[stat].main + (pokemon.stats[stat].bonus.level * poke?.training?.level!))
    pokemon.stats[stat].total
        = Math.round((pokemon.stats[stat].main
        + (pokemon.stats[stat].bonus.level * poke?.training?.level!)
        + (pokemon.stats[stat].bonus.point ?? 0)) * 100) / 100

    nStats[stat] = {
      ...pokemon.stats[stat],
    }
  }

  poke.stats = nStats
  poke.info.cp = Math.round(newCP)
  return poke
}
export const rollOnePokemonById = async (pokedex?: number) => {
  const poi = await PokemonInfoSchema.findOne({ 'info.pokedex': pokedex })
  const stats = poi?.stats
  let originCP = 0
  let newCP = 0

  const nStats: any = {}
  const rollPokeLevel = Math.round(randomNumber(1, 20))

  // const i = 6
  // const rate = 1.3
  // console.log('result', 0.89 * 100 / 1.3)
  // console.log('result', 6 * 62/; / 100)
  //
  for (const stat in stats) {
    const ran = Math.round(randomNumber(0.6, 1.3) * 100) / 100
    const main = (stats[stat].total * ran) / stats[stat].quality

    const bonusLevelOrigin = stats[stat].bonus.level
    const qualityRate = stats[stat].quality
    const bonusQualityRate = ran * 100 / qualityRate
    const bonusLevel = Math.round(bonusLevelOrigin * bonusQualityRate / 100)

    originCP += statsToCP[stat] * stats[stat].total
    newCP += statsToCP[stat] * (main + (bonusLevel * rollPokeLevel))

    nStats[stat] = {
      main: roundNumber(main, 2),
      quality: ran,
      level: 1,
      bonus: {
        level: bonusLevel,
      },
    }
  }

  const newSkill = poi?.skill
  newSkill!.level = Math.round(randomNumber(1, 10))

  return {
    pokedex: poi?.info.pokedex,
    skill: newSkill,
    stats: nStats,
    element: poi?.element,
    info: {
      name: poi?.info.name,
      gen: poi?.info.gen,
      pokedex: poi?.info.pokedex,
      role: poi?.info.role,
      cp: newCP,
      perfect: newCP / originCP * 100,
      point: rollPokeLevel * 3,
    },
    training: {
      exp: 0,
      level: rollPokeLevel,
      maxExp: rollPokeLevel * DEFAULT_EXP_LEVEL,
    },
    element_bonus: {
      defend: {
        normal: {
          level: 0,
        },
        fighting: {
          level: 0,
        },
        flying: {
          level: 0,
        },
        poison: {
          level: 0,
        },
        ground: {
          level: 0,
        },
        rock: {
          level: 0,
        },
        bug: {
          level: 0,
        },
        ghost: {
          level: 0,
        },
        steel: {
          level: 0,
        },
        fire: {
          level: 0,
        },
        water: {
          level: 0,
        },
        grass: {
          level: 0,
        },
        electric: {
          level: 0,
        },
        psychic: {
          level: 0,
        },
        ice: {
          level: 0,
        },
        dragon: {
          level: 0,
        },
        dark: {
          level: 0,
        },
        fairy: {
          level: 0,
        },
      },
      attack: {
        normal: {
          level: 0,
        },
        fighting: {
          level: 0,
        },
        flying: {
          level: 0,
        },
        poison: {
          level: 0,
        },
        ground: {
          level: 0,
        },
        rock: {
          level: 0,
        },
        bug: {
          level: 0,
        },
        ghost: {
          level: 0,
        },
        steel: {
          level: 0,
        },
        fire: {
          level: 0,
        },
        water: {
          level: 0,
        },
        grass: {
          level: 0,
        },
        electric: {
          level: 0,
        },
        psychic: {
          level: 0,
        },
        ice: {
          level: 0,
        },
        dragon: {
          level: 0,
        },
        dark: {
          level: 0,
        },
        fairy: {
          level: 0,
        },
      },
    },
  } as Pokemon
}
