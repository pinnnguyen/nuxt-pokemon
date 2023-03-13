import mongoose from 'mongoose'
import type { Pokemon } from '~/types/pokemon'

const schema = new mongoose.Schema<Pokemon>(
  {
    _id: {
      type: String,
    },
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

// schema.index({ pokedex: -1 }, { unique: true })
export const monsterSchema = mongoose.model('monsterSchema', schema, 'monsters')
