export default defineNuxtRouteMiddleware(async () => {
  const { status } = useSession()
  const { playerInfo } = storeToRefs(usePlayerStore())
  try {
    await usePlayerStore().getPlayer()
  }
  catch (e) {
    return
  }

  if (status.value === 'authenticated' && playerInfo.value)
    return navigateTo('/')
})
