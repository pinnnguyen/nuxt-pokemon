import mongoose from 'mongoose'
import type { Pokemon } from '~/types/pokemon'

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
export const MonsterSchema = mongoose.model('MonsterSchema', schema, 'monsters')
