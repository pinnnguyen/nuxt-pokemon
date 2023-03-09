<template>
  <div
    w="full"
    class="flex items-center justify-center gap-2"
  >
    <nuxt-img format="webp" src="/common/line-head.png" class="h-3" />
    <slot />
    <nuxt-img format="webp" src="/common/line-head.png" class="h-3 transform rotate-180" />
  </div>
</template>
