import { getServerSession } from '#auth'
import { handle1v1Battle } from '~/server/utils/battle'

export default defineEventHandler(async (event) => {
  const session: any = await getServerSession(event)
  const body = await readBody<{
    enemyId: string
    pokemonId: string
    format: string
  }>(event)
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  if (!body.enemyId || !body.pokemonId || !body.format) {
    return {
      success: false,
      message: 'Missing params',
    }
  }

  return handle1v1Battle(body)
})
