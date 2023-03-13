export default defineNuxtRouteMiddleware(async () => {
  const { status } = useSession()
  const { playerInfo } = storeToRefs(usePlayerStore())
  try {
    await usePlayerStore().getPlayer()
  }
  catch (e) {
    console.log('e', e)
  }

  if (status.value !== 'authenticated')
    return navigateTo('/login')

  if (status.value === 'authenticated' && playerInfo.value)
    return navigateTo('/')
})
