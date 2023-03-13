import { playerPokemonSchema, playerSchema, pokemonInfoSchema, rollOnePokemonById } from '~/server/schema'
import { getServerSession } from '#auth'

interface CreateRoleBody {
  pokedex: number
}

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  const body = await readBody<CreateRoleBody>(event)

  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const pokemonInfoData = await pokemonInfoSchema.findOne({ 'info.pokedex': body.pokedex }).select({ _id: false })
  const randomName = (Math.random() + 1).toString(36).substring(7)

  const pokeRoll = await rollOnePokemonById(pokemonInfoData?.info?.pokedex)
  const createPlayer = await playerSchema.create({
    sid: (session as any).sid,
    username: session?.user?.email,
    name: randomName,
    pokeCoin: 0,
    pokeSilver: 0,
  })

  const createPlayerPokemon = await playerPokemonSchema.create({
    sid: (session as any).sid,
    stats: pokeRoll.stats,
    skill: pokeRoll.skill,
    info: pokeRoll.info,
    element: pokeRoll.element,
  })

  return {
    player: createPlayer,
    pokemons: createPlayerPokemon,
  }
})
