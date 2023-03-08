const { signIn } = useSession()

const useAuth = () => {
  const login = async (username: string, password: string) => {
    const { error, url } = await signIn('credentials', {
      username,
      password,
      redirect: false,
    })

    return {
      error,
      url,
    }
  }

  const register = async (email: string, password: string) => {
    try {
      return await $fetch('/api/user/register', {
        method: 'POST',
        body: {
          email,
          password,
        },
      })
    }
    catch (e) {
      showNotify({ type: 'danger', message: 'Đăng ký thất bại!' })
      throw new Error('Đăng ký thất bại!')
    }
  }

  return {
    login,
    register,
  }
}

export { useAuth as default }
