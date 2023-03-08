import mongoose from 'mongoose'
import { POKEMON_SCHEMA } from '~/server/constant'
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString()
      },
    },
    pokedex: Number,
    name: String,
    element: String,
    total_point: Number,
    role: String,
    buff: Number,
  },
  {
    timestamps: true,
  },
)

schema.index({ pokedex: -1 }, { unique: true })
export const PokemonSchema = mongoose.model('PokemonSchema', schema, POKEMON_SCHEMA)
