import { storeToRefs } from 'pinia'

export default defineNuxtRouteMiddleware(async () => {
  const { status } = useSession()

  const { getPlayer } = usePlayerStore()
  const { playerInfo } = storeToRefs(usePlayerStore())

  if (status.value !== 'authenticated')
    return navigateTo('/login')

  if (playerInfo.value?.name)
    return

  await getPlayer()
})
