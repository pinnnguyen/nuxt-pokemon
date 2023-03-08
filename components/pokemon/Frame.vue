<template>
  <div
    flex
    flex-col
    items-center
  >
    <slot name="avatar" />
    <div class="relative text-10 font-semibold">
      <nuxt-img format="webp" class="h-14" src="/background/pokemon_frame.png" />
      <p class="absolute left-5 top-2 text-12 font-extrabold uppercase text-blue-500">
        <slot name="name" />
      </p>
      <p absolute bottom-2 left-3 text-12 font-extrabold>
        <slot name="cp" />
      </p>
      <p absolute top-2 right-2 text-12>
        <slot name="level" />
      </p>
      <div class="absolute bottom-2 right-5">
        <div class="flex gap-1">
          <slot name="element" />
        </div>
      </div>
    </div>
  </div>
</template>
