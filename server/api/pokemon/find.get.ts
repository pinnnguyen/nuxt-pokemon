import { formatPokemonInfo, playerPokemonSchema } from '~/server/schema'
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

  if (!query.pokemonId) {
    return {
      success: false,
      message: 'Missing pokemonId',
    }
  }

  const pokemon = await playerPokemonSchema.findOne({ _id: query.pokemonId, sid: session.sid })
  if (!pokemon) {
    return {
      success: false,
      message: 'Pokemon not found',
    }
  }

  return await formatPokemonInfo(pokemon)
})
