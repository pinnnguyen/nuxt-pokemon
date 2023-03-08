import mongoose from 'mongoose'
import { POKEMON_INFO_SCHEMA } from '~/server/constant'
import { randomNumber, roundNumber } from '~/utils'
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString()
      },
    },
    info: {},
    stats: {},
    element: [],
    skill: {},
  },
  {
    timestamps: true,
  },
)

schema.index({ 'info.pokedex': -1 }, { unique: true })
export const PokemonInfoSchema = mongoose.model('PokemonInfoSchema', schema, POKEMON_INFO_SCHEMA)

export const rollOnePokemon = async (pokedex?: number) => {
  const pokemonInfo = await PokemonInfoSchema.findOne({ 'info.pokedex': pokedex })
  const stats = pokemonInfo?.stats

  const newStats = {}
  for (const stat in stats) {
    const ran = Math.round(randomNumber(0.7, 1.3) * 100) / 100
    // console.log('ran', ran)
    const main = (stats[stat].total * ran) / stats[stat].quality
    const bonus = stats[stat].bonus
    const level = stats[stat].level
    // const quality = ran

    newStats[stat] = {
      main: roundNumber(main, 2),
      total: roundNumber(main, 2),
      quality: ran,
      level,
      bonus,
    }
  }

  // console.log('newStats', newStats)
  const newSkill = pokemonInfo?.skill
  const ranS = Math.round(randomNumber(1, 10))
  newSkill!.level = ranS

  return {
    skill: newSkill,
    stats: newStats,
    element: pokemonInfo.element,
    info: {
      name: pokemonInfo.info.name,
      gen: pokemonInfo.info.gen,
      pokedex: pokemonInfo.info.pokedex,
      level: pokemonInfo.info.level,
      training: pokemonInfo.info.training,
      role: pokemonInfo.info.role,
    },
  }

  // return {
  //   ...cloneDeep(pokemonInfo.info),
  // }
}
