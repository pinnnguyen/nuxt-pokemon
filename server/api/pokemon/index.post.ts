import { PokemonInfoSchema } from '~/server/schema'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return PokemonInfoSchema.find({
    'info.pokedex': body.pokedexs,
  })
})
