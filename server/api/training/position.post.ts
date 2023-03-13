import { getServerSession } from '#auth'
import { playerSchema } from '~/server/schema'

export default defineEventHandler(async (event) => {
  const session: any = await getServerSession(event)
  const body = await readBody<{
    pokemonId: string
    pos: number
  }>(event)

  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  if (!body.pokemonId) {
    return {
      success: false,
      message: 'Missing params',
    }
  }

  const player = await playerSchema.findOne({ sid: session.sid })
  if (!player) {
    return {
      success: false,
      message: 'Player not found',
    }
  }

  const nTrainings = player?.trainings ?? []
  if (nTrainings && nTrainings.length === 5) {
    return {
      success: false,
      message: 'Số lượng pokemon huấn luyện đã đạt giới hạn tối đa',
    }
  }

  nTrainings[body.pos] = body.pokemonId
  await playerSchema.findOneAndUpdate({ sid: session.sid }, {
    trainings: nTrainings,
  })

  return {
    success: true,
  }
})
