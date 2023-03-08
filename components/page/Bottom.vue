<script lang="ts" setup>
const toggleMyPokemon = useState('toggleMyPokemon', () => false)
const ontoggleMyPokemon = () => {
  toggleMyPokemon.value = true
}
</script>

<template>
  <div sticky bottom-28 mb-4 flex items-center justify-around text-14>
    <div class="flex flex-col justify-center items-center">
      <nuxt-img format="webp" class="w-12 h-12" src="/icons/menu_quest.png" />
      <span class=" text-white">
        Nhiệm vụ
      </span>
    </div>
    <div class="flex flex-col justify-center items-center">
      <nuxt-img format="webp" class="w-12 h-12" src="/icons/menu_shop.png" />
      <span class=" text-white">
        Cửa hàng
      </span>
    </div>
    <div class="flex flex-col justify-center items-center">
      <nuxt-img format="webp" class="w-12 h-12" src="/icons/menu_clan.png" />
      <span class=" text-white">
        Công hội
      </span>
    </div>
    <div class="flex flex-col justify-center items-center">
      <nuxt-img format="webp" class="w-12 h-12" src="/icons/menu_badge.png" />
      <span class=" text-white">
        Thành tựu
      </span>
    </div>
    <div class="flex flex-col justify-center items-center">
      <nuxt-img format="webp" class="w-12 h-12" src="/icons/menu_setting.png" />
      <span class="text-12 text-white">
        Cài đặt
      </span>
    </div>
  </div>
  <div bg-white sticky bottom-0 w-full text-xl flex items-center justify-around rounded-t-3xl text-14 font-semibold h-25>
    <div class="flex flex-col justify-center items-center pt-2">
      <nuxt-img format="webp" class="w-18" src="/icons/pokemon_catch.png" />
      <span class="">
        Mở
      </span>
    </div>
    <div class="flex flex-col justify-center items-center pt-2" @click.stop="ontoggleMyPokemon">
      <nuxt-img format="webp" class="w-18" src="/icons/pokemon_list.png" />
      <span class="">
        Pokemon
      </span>
    </div>
    <div class="flex flex-col justify-center items-center pt-2">
      <nuxt-img format="webp" class="w-18" src="/icons/pokemon_bag.png" />
      <span class="">
        Túi đồ
      </span>
    </div>
    <div class="flex flex-col justify-center items-center pt-2">
      <nuxt-img format="webp" class="w-18" src="/icons/pokemon_activity.png" />
      <span class="">
        Hoạt động
      </span>
    </div>
  </div>
</template>
