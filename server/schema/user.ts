import mongoose from 'mongoose'
import { USER_SCHEMA } from '~/server/constant'
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
    email: String,
    password: String,
  },
  { timestamps: true },
)
export const UserSchema = mongoose.model('UserSchemas', schema, USER_SCHEMA)
