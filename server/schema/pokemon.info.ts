import mongoose from 'mongoose'
import { POKEMON_INFO_SCHEMA } from '~/server/constant'
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
export const pokemonInfoSchema = mongoose.model('pokemonInfoSchema', schema, POKEMON_INFO_SCHEMA)
