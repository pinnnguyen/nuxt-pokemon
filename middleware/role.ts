export default defineNuxtRouteMiddleware(async () => {
  const { status } = useSession()

  if (status.value === 'authenticated')
    return navigateTo('/')
})
