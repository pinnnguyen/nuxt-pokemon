import { getServerSession } from '#auth'
import { playerPokemonSchema, playerSchema } from '~/server/schema'

export default defineEventHandler(async (event) => {
  const session: any = await getServerSession(event)
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const player = await playerSchema.findOne({ sid: session.sid })
  if (!player) {
    return {
      success: false,
      message: 'Player not found',
    }
  }

  const nTrainings = player?.trainings ?? []
  if (nTrainings && nTrainings.length > 0) {
    const fTraining = nTrainings.filter(Boolean)

    return playerPokemonSchema.find({
      _id: { $in: fTraining },
    }).select('info training')
  }

  return []
})
