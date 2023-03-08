export default defineNuxtConfig({
  app: {
    keepalive: true,
    buildAssetsDir: '/assets/',
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
        },
      ],
    },
  },
  ssr: false,
  nitro: {
    plugins: [
      '~/server/index.ts',
    ],
  },
  runtimeConfig: {
    mongoUrl: process.env.MONGO_URL,
  },
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@sidebase/nuxt-auth',
    'nuxt-icon',
    '@pinia/nuxt',
    '@vant/nuxt',
    '@nuxt/image-edge',
    '@nuxt/devtools',
  ],
  auth: {
    origin: process.env.ORIGIN_URL,
    enableGlobalAppMiddleware: false,
  },
  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/styles/main.css',
    // '~/assets/styles/global.css',
  ],
  experimental: {
    payloadExtraction: false,
    inlineSSRStyles: false,
  },
  pinia: {
    autoImports: ['storeToRefs', 'acceptHMRUpdate', 'defineStore'],
  },
})
