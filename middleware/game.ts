import { storeToRefs } from 'pinia'

export default defineNuxtRouteMiddleware(async () => {
  const { getPlayer } = usePlayerStore()
  const { playerInfo } = storeToRefs(usePlayerStore())

  if (!playerInfo.value)
    return navigateTo('/role')

  await getPlayer()
})
