import mongoose from 'mongoose'
import { PLAYER_POKEMON_SCHEMA } from '~/server/constant'
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  },
)

schema.index({ 'info.pokedex': -1 }, { unique: true })
schema.index({ username: -1 })
export const PlayerPokemonSchema = mongoose.model('PlayerPokemonSchema', schema, PLAYER_POKEMON_SCHEMA)
