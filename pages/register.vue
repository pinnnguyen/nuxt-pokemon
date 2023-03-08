<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  auth: false,
})

const password = ref('')
const rePassword = ref('')
const email = ref('')

const handleRegister = async () => {
  if (password.value !== rePassword.value) {
    showNotify({ type: 'danger', message: 'Mật khẩu không trùng nhau' })
    return
  }

  const user = await useAuth().register(email.value, password.value)
  if (user) {
    showNotify({ type: 'success', message: 'Đăng ký thành công!' })
    return navigateTo('/login')
  }
}
</script>

<template>
  <section>
    <div class="flex flex-col items-center justify-center h-screen relative">
      <nuxt-img class="absolute top-0" src="/background/home.png" format="webp" style="filter: blur(4px)" />
      <div class="absolute p-4">
        <NuxtLink to="/" class="flex justify-center font-semibold text-center">
          <nuxt-img class="h-[130px] flex justify-center" src="/logo.png" alt="logo" />
        </NuxtLink>
        <!--        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"> -->
        <!--          Huấn luyện pokemon theo cách của bạn -->
        <!--        </h1> -->
        <div class="mt-2">
          <input v-model="email" class="form-input" required type="email" placeholder="Email">
          <input v-model="password" class="form-input" required type="password" placeholder="Password">
          <input v-model="rePassword" class="form-input" required type="password" placeholder="Nhập lại mật khẩu">
        </div>
        <div class="flex justify-center mt-4">
          <button class="button-yes" @click="handleRegister">
            Đăng ký
          </button>
        </div>
        <p class="text-center mt-2 text-white">
          <NuxtLink to="/login" class="font-medium text-white">
            Đăng nhập
          </NuxtLink>
        </p>
      </div>
    </div>
  </section>
</template>
