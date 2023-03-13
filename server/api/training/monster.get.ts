import { getServerSession } from '#auth'
import { formatPokemon, monsterSchema } from '~/server/schema'

export default defineEventHandler(async (event) => {
  const session: any = await getServerSession(event)
  const query: any = getQuery(event)

  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  if (!query.level) {
    return {
      success: false,
      message: 'Missing params',
    }
  }

  const monster = await monsterSchema.findOne({ 'training.level': parseInt(query.level) })
  if (!monster)
    return {}

  return formatPokemon(monster)
})
