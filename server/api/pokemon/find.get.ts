import { PlayerPokemonSchema, formatPokemonInfo } from '~/server/schema'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const session: any = await getServerSession(event)
  const query = getQuery(event)
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  if (!query.pokedex) {
    return {
      success: false,
      message: 'Missing pokedex',
    }
  }

  const pokemon = await PlayerPokemonSchema.findOne({ pokedex: query.pokedex, sid: session.sid })
  if (!pokemon) {
    return {
      success: false,
      message: 'Pokemon not found',
    }
  }

  return await formatPokemonInfo(pokemon)
})
