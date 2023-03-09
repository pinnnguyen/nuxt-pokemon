import { PlayerPokemonSchema, PlayerSchema, PokemonInfoSchema, rollOnePokemonById } from '~/server/schema'
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

  const pokemonInfoData = await PokemonInfoSchema.findOne({ 'info.pokedex': body.pokedex })
  const randomName = (Math.random() + 1).toString(36).substring(7)

  const pokeRoll = await rollOnePokemonById(pokemonInfoData?.info?.pokedex)
  const createPlayer = await PlayerSchema.create({
    sid: (session as any).sid,
    username: session?.user?.email,
    name: randomName,
    pokeCoin: 0,
    pokeSilver: 0,
  })

  const createPlayerPokemon = await PlayerPokemonSchema.create({
    sid: (session as any).sid,
    pokedex: pokeRoll.info.pokedex,
    ...pokeRoll,
  })
  // return {
  //   player: {},
  //   pokemons: {},
  // }

  return {
    player: createPlayer,
    pokemons: createPlayerPokemon,
  }
})
