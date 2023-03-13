import mongoose from 'mongoose'
import { PLAYER_POKEMON_SCHEMA, PLAYER_SCHEMA } from '~/server/constant'
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
    username: { type: String, unique: true },
    name: String,
    pokeSilver: Number,
    pokeCoin: Number,
    trainings: [],
  },
  {
    timestamps: true,
  },
)

schema.index({ username: -1 }, { unique: true })
export const playerSchema = mongoose.model('playerSchema', schema, PLAYER_SCHEMA)

export const getPlayer = async (sid?: string | null) => {
  return playerSchema.aggregate([
    {
      $match: {
        sid,
      },
    },
    {
      $lookup: {
        from: PLAYER_POKEMON_SCHEMA,
        localField: 'sid',
        foreignField: 'sid',
        as: 'pokemons',
        pipeline: [
          {
            $limit: 1,
          },
        ],
      },
    },
  ])
}
