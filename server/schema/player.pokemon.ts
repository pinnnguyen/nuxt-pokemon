import mongoose from 'mongoose'
import { PLAYER_POKEMON_SCHEMA } from '~/server/constant'
import { randomNumber, roundNumber } from '~/utils'
import { PokemonInfoSchema } from '~/server/schema/pokemon.info'
import type { Pokemon } from '~/types/pokemon'
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema<Pokemon>(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString()
      },
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

export const rollOnePokemonById = async (pokedex?: number) => {
  const poi = await PokemonInfoSchema.findOne({ 'info.pokedex': pokedex })
  const stats = poi?.stats
  const cp = 0

  const nStats: any = {}
  for (const stat in stats) {
    const ran = Math.round(randomNumber(0.7, 1.3) * 100) / 100
    const main = (stats[stat].total * ran) / stats[stat].quality

    nStats[stat] = {
      main: roundNumber(main, 2),
      // total: roundNumber(main, 2),
      quality: ran,
      level: 1,
      bonus: {
        level: 0,
      },
    }
  }

  const newSkill = poi?.skill
  newSkill!.level = Math.round(randomNumber(1, 10))
  const rollPokeLevel = Math.round(randomNumber(1, 20))

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
      cp: 0,
      point: rollPokeLevel * 3,
    },
    training: {
      exp: 0,
      level: rollPokeLevel,
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
