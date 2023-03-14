import { getServerSession } from '#auth'
import { convertMillisecondsToSeconds, convertSecondsToMinutes } from '~/utils'
import { playerPokemonSchema, playerSchema } from '~/server/schema'

export default defineEventHandler(async (event) => {
  const session: any = await getServerSession(event)
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const player = await playerSchema.findOne({ sid: session.sid }).select('trainings')
  if (!player) {
    return {
      success: false,
      message: 'Player not found',
    }
  }

  const nTrainings = player?.trainings ?? []
  if (nTrainings.length <= 0) {
    return {
      success: false,
      message: 'No training found',
    }
  }

  const nPokemon = await playerPokemonSchema.find({
    _id: { $in: nTrainings.filter(Boolean) },
  })

  if (!nPokemon) {
    return {
      success: false,
      message: 'No pokemon found',
    }
  }

  const results = []
  for (let i = 0; i < nPokemon.length; i++) {
    const lastTimeReceivedRss = nPokemon[i]?.last_time_received_rss ?? new Date().getTime()
    const now = new Date().getTime()
    const seconds = Math.round(convertMillisecondsToSeconds(now - lastTimeReceivedRss))
    const minutes = Math.round(convertSecondsToMinutes(seconds))
    let exp = 0

    const expInMinute = nPokemon[i].info.training! * 24
    for (let e = 0; e < minutes; e++)
      exp += expInMinute

    await playerPokemonSchema.findByIdAndUpdate(nPokemon[i]._id, {
      last_time_received_rss: new Date().getTime(),
      $inc: {
        'training.exp': exp,
      },
    })

    results.push({
      pokedex: nPokemon[i].info.pokedex,
      data: [],
      exp,
    })
  }

  return results
})
