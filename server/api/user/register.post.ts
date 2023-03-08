import mongoose from 'mongoose'
import { UserSchema } from '~/server/schema'
const ObjectId = mongoose.Types.ObjectId

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const user = await UserSchema.findOne({ email: body.email })
  if (user) {
    return createError({
      statusCode: 400,
      statusMessage: 'USERNAME EXITS',
    })
  }

  const newUser = new UserSchema({
    sid: new ObjectId().toString(),
    email: body.email,
    password: body.password,
  })

  await newUser.save()

  return {
    user: newUser,
  }
})
