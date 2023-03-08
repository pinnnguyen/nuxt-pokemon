import { storeToRefs } from 'pinia'

export default defineNuxtRouteMiddleware(async () => {
  const { getPlayer } = usePlayerStore()
  const { status } = useSession()

  const { playerInfo } = storeToRefs(usePlayerStore())

  if (status.value !== 'authenticated')
    return navigateTo('/login')

  if (!playerInfo.value)
    return navigateTo('/role')

  await getPlayer()
})
