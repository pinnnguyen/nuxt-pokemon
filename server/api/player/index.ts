import { getServerSession } from '#auth'
import { getPlayer } from '~/server/schema'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const playerResource = await getPlayer((session as any)?.sid)
  if (!playerResource) {
    return createError({
      statusCode: 404,
      statusMessage: 'Player not found',
    })
  }

  return playerResource[0]
})
