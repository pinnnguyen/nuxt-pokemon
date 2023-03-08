<script setup lang="ts">
definePageMeta({
  auth: false,
  layout: 'auth',
})

const password = ref('')
const email = ref('')

const handleLogin = async () => {
  const { error, url } = await useAuth().login(email.value, password.value)
  if (url) {
    showNotify({ type: 'success', message: 'Đăng nhập thành công!' })
    return navigateTo('/role')
  }

  if (error)
    showNotify({ type: 'danger', message: 'Đăng nhập thất bại' })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen relative">
    <NuxtImg class="absolute top-0" src="/background/home.png" format="webp" style="filter: blur(4px)" />
    <div class="absolute" p-4>
      <NuxtLink to="/" class="flex justify-center font-semibold text-center">
        <NuxtImg class="h-[130px] flex justify-center" src="/logo.png" alt="logo" />
      </NuxtLink>
      <!--      <h1 class="text-lg"> -->
      <!--        Huấn luyện pokemon theo cách của bạn -->
      <!--      </h1> -->
      <div class="mt-2">
        <input v-model="email" class="form-input" placeholder="Email">
        <input v-model="password" class="form-input" placeholder="Password">
      </div>
      <div class="flex justify-center">
        <button class="button-yes" @click="handleLogin">
          Đăng nhập
        </button>
      </div>
      <p class="text-center mt-2 text-white">
        <NuxtLink to="/register" class="font-medium text-white">
          Đăng ký tài khoản mới
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
