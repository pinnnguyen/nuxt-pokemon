import { pokemonInfoSchema } from '~/server/schema'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return pokemonInfoSchema.find({
    'info.pokedex': body.pokedexs,
  })
})
