<script lang="ts" setup>
const { playerInfo } = storeToRefs(usePlayerStore())
</script>

<template>
  <header class="">
    <div class="absolute top-4 left-4">
      <div class="flex items-center justify-center">
        <nuxt-img z-99 class="w-12 h-12 rounded-full z-9" src="/avatar/default.png" format="webp" />
        <div z-9 class="bg-white rounded-3xl h-8 w-40 absolute left-5 flex items-center justify-center text-16">
          {{ playerInfo.name }}
        </div>
      </div>
    </div>

    <div class="absolute top-4 right-4">
      <div class="flex items-center justify-center">
        <nuxt-img z-99 class="w-12 h-12  rounded-full z-9" src="/icons/pokecoin.png" format="webp" />
        <div z-9 class="bg-white rounded-3xl h-8 w-30 absolute right-5 flex items-center justify-center text-12">
          <svg class="w-8 absolute right-22" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" /></svg>
          <span class="text-16">
            0
          </span>
        </div>
      </div>
    </div>
  </header>
</template>
