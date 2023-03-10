import { getServerSession } from '#auth'
import { PlayerPokemonSchema } from '~/server/schema'
import { statsLevelBonus } from '~/game-config'

export default defineEventHandler(async (event) => {
  const session: any = await getServerSession(event)
  const body = await readBody<{
    action: 'stats_up'
    pokemon: string
    stat: string
  }>(event)

  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  if (!body.action) {
    return {
      success: false,
      message: 'Missing action',
    }
  }

  if (!body.pokemon) {
    return {
      success: false,
      message: 'Missing pokemon',
    }
  }

  if (!body.stat) {
    return {
      success: false,
      message: 'Missing pointAdd',
    }
  }

  const pokemon = await PlayerPokemonSchema.findById(body.pokemon).select('stats info')
  if (!pokemon) {
    return {
      success: false,
      message: 'Pokemon not found',
    }
  }

  const stats = pokemon?.stats
  const point = pokemon?.info.point ?? 0
  const needPoint = stats[body.stat].level + 2
  if (point < needPoint) {
    return {
      success: false,
      message: 'Không đủ điểm để nâng cấp',
    }
  }

  const levelBonus = statsLevelBonus[body.stat]
  if (!stats[body.stat].bonus.point)
    stats[body.stat].bonus.point = 0

  stats[body.stat].level += 1
  stats[body.stat].bonus.point += levelBonus

  await PlayerPokemonSchema.findByIdAndUpdate(body.pokemon, {
    stats,
    $inc: {
      'info.point': -needPoint,
    },
  }, {
    new: true,
  })

  return {
    success: true,
    message: 'Nâng cấp thành công',
  }
})
