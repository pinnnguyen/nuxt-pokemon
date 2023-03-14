<script setup lang="ts">
const { emulators, teams, format } = storeToRefs(useBattle())
const realTime = ref()
const receive = ref()
const now = ref()
const round = ref(0)

onMounted(async () => {
  for (let i = 0; i < emulators.value.length; i++) {
    round.value++
    const emulator = emulators.value[i][`0_${round.value}`]
    for (const turn of emulator) {
      await sleep(1500)

      receive.value = turn.receive
      now.value = turn.now

      realTime.value = {
        ...realTime.value,
        [turn.emuId]: {
          doAction: true,
          target: turn.target,
        },
      }

      setTimeout(() => {
        realTime.value[turn.emuId].doAction = false
      }, 500)
    }
  }
})

const magic = (emuId: string, maxMp: number) => {
  if (!now.value)
    return 100

  return (now.value.mp[emuId] / maxMp) * 100
}

const health = (emuId: string, maxHp: number) => {
  if (!now.value)
    return 100

  if (now.value.hp[emuId] <= 0)
    return 0

  return (now.value.hp[emuId] / maxHp) * 100
}

const doAction = (emuId: string) => {
  return realTime.value && realTime.value[emuId]?.doAction
}

const receiveDamage = (emuId: string) => {
  return receive.value && receive.value[emuId]?.receiveDamage
}

const isSolo = computed(() => format.value === 'solo')
</script>

<template>
  <div absolute w-full h-full class="pokemon_battle_screen transform-center">
    <div
      v-for="(battle, key) in teams" :key="key"
      :class="{
        bottom: battle.teamPosition === 1,
        top: battle.teamPosition === 2,
      }"
    >
      <div v-for="(b, emuId) in battle.list" :key="emuId" class="relative standing" :class="{ total_1: isSolo }">
        <div
          class="effect"
          :class="{
            show: receiveDamage(emuId),
          }"
        >
          <NuxtImg v-if="receiveDamage(emuId)" src="/common/attack.gif" />
        </div>
        <div
          class="damage_value"
          :class="{
            show: receiveDamage(emuId),
          }"
        >
          <p class="attack">
            -{{ receiveDamage(emuId) }}
          </p>
        </div>
        <div class="hp_mp_bar">
          <div class="bar_div hp">
            <div v-if="b" class="bar" :style="{ width: `${health(emuId, b.hp)}%` }" />
          </div>
          <div class="bar_div mp">
            <div v-if="b" class="bar w-full" />
          </div>
          <!--          <div class="status_icon" /> -->
        </div>
        <NuxtImg class="stand" format="webp" src="/background/pokemon_stand.png" />
        <NuxtImg
          class="avatar"
          :class="{
            attack: doAction(emuId),
            attacked: receiveDamage(emuId),
          }"
          :src="`/character/${b.info.pokedex}.gif`"
        />
      </div>
    </div>
  </div>
</template>
