<script lang="ts" setup>
import { statsLevelBonus, statsName } from '~/game-config'
const { prepareAddPoint } = useStats()
const { pokemonDetail } = storeToRefs(usePokemon())
</script>

<template>
  <div relative p-4 bg-dark-400 text-light-400 border border-dark-100 rounded>
    <div class="w-[60vh]">
      <div mb-2>
        <div flex justify-around mb-2>
          <div>
            <nuxt-img :src="`/character/${pokemonDetail.pokedex}.gif`" />
          </div>
          <div flex flex-col gap-2>
            <p text-18 text-blue-500 font-extrabold>
              {{ pokemonDetail?.info?.name }}
            </p>
            <div>
              <span font-bold>CP {{ Math.round(pokemonDetail.info.cp) ?? 0 }}</span>
              (Hoàn mỹ {{ Math.round(pokemonDetail.info.perfect) ?? 0 }}%)
            </div>
            <div flex items-center gap-1>
              <div w-4 h-4 bg-light-200 text-dark-400 rounded flex items-center justify-center font-extrabold>
                <Icon name="ic:baseline-plus" size="20" />
              </div>
              <span font-bold>{{ pokemonDetail.info.point ?? 0 }}</span>
              <span text-blue-400>(Reset)</span>
            </div>
          </div>
          <div class="w-14 h-14 bg-black rounded">
            <nuxt-img w-full h-full object-cover src="/level/0.png" />
          </div>
          <div flex flex-col items-end gap-1 mb-1>
            <p flex gap-1>
              <nuxt-img v-for="element in pokemonDetail.element" :key="element" class="w-6 h-6" format="webp" :src="`/elements/${element}.png`" />
            </p>
            <p>
              <nuxt-img class="w-6 h-6" format="webp" :src="`/elements/${pokemonDetail.info.role}.png`" />
            </p>
          </div>
        </div>
        <div flex justify-between items-center gap-4>
          <div w-full>
            <div flex justify-between mb-2>
              <div>
                <span>
                  LEVEL {{ pokemonDetail?.training?.level }}
                </span>
                <span class="text-[#aaa]">
                  (Tiến hóa)
                </span>
              </div>
              <div>
                {{ pokemonDetail?.training?.exp }}/{{ pokemonDetail?.training?.maxExp }}
              </div>
            </div>
            <div class="bg-dark-700 rounded-3xl h-4">
              <div class="bg-[#FCD95F]" rounded-3xl h-4 w-0 />
            </div>
          </div>
          <div flex w-25>
            <div flex items-center justify-center h-13 absolute text-16 text-white font-extrabold>
              Level UP
            </div>
            <NuxtImg w-full h-13 format="webp" src="/common/pokemon_level_up.png" />
          </div>
        </div>
      </div>
    </div>
    <div class="h-[80vh] scrollbar-hide overflow-auto w-[60vh]">
      <Line text-16 my-2>
        Thuộc tính cơ bản
      </Line>
      <div
        v-for="(stat, key) in pokemonDetail.stats" :key="key"
        flex items-center justify-between w-full h-12 text-16
      >
        <div flex items-center justify-center gap-1>
          {{ statsName[key] }}
          <span opacity-50>{{ stat?.quality }}</span>
        </div>
        <div flex items-center gap-1>
          <span>{{ stat?.total }}</span>
          <NuxtImg mr-1 h-5 src="/common/pokemon_stats_right.png" />
          <div w-25 text-right flex items-center justify-end gap-2>
            <span text-green-500>{{ Math.round(((stat?.total) + statsLevelBonus[key]) * 100) / 100 }}</span>
            <span opacity-50>{{ stat?.level + 2 }}</span>
            <Icon name="ic:baseline-add-circle" size="26" @click="prepareAddPoint(key, stat, pokemonDetail._id)" />
          </div>
        </div>
      </div>
      <div flex justify-between mt-4>
        <div text-16>
          <div text-center mb-2>
            TẤN CÔNG
          </div>
          <div v-for="(element, key) in pokemonDetail.element_bonus.attack" :key="key" flex items-center>
            <div flex items-center gap-2 h-12>
              <NuxtImg :src="`/elements/${key}.png`" format="webp" class="h-6" />
              {{ element?.total ?? 0 }}%
              <NuxtImg mr-1 h-5 src="/common/pokemon_stats_right.png" />
            </div>
            <div text-right flex items-center justify-end gap-2>
              <span text-green-500>{{ element?.total ?? 10 }}%</span>
              <span opacity-50>{{ element?.level + 6 }}</span>
              <Icon name="ic:baseline-add-circle" size="26" />
            </div>
          </div>
        </div>
        <div text-16>
          <div text-center mb-2>
            PHÒNG THỦ
          </div>
          <div v-for="(element, key) in pokemonDetail.element_bonus.defend" :key="key" flex items-center>
            <div flex items-center gap-2 h-12>
              <NuxtImg :src="`/elements/${key}.png`" format="webp" class="h-6" />
              {{ element?.total ?? 0 }}%
              <NuxtImg mr-1 h-5 src="/common/pokemon_stats_right.png" />
            </div>
            <div text-right flex items-center justify-end gap-2>
              <span text-green-500>{{ element?.total ?? 5 }}%</span>
              <span opacity-50>{{ element?.level + 6 }}</span>
              <Icon name="ic:baseline-add-circle" size="26" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
