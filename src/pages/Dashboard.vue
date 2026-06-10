<script setup lang="ts">
import { ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'
import type { IndicatorKey, Player } from '../types'
import PlayerList from '../components/PlayerList.vue'
import RadarCompare from '../components/RadarCompare.vue'
import TrendChart from '../components/TrendChart.vue'
import IndicatorSelector from '../components/IndicatorSelector.vue'
import DrillDownTable from '../components/DrillDownTable.vue'
import { usePlayerSelection } from '../composables/usePlayerSelection'

const { playerA, playerB } = usePlayerSelection()

const selectedIndicator = ref<IndicatorKey>('forehandWinRate')
const drillDownVisible = ref(false)
const drillDownPlayer = ref<Player | null>(null)
const drillDownIndicatorKey = ref<IndicatorKey | null>(null)
const sidebarOpen = ref(false)

function handleDrillDown(playerId: string, indicatorKey: IndicatorKey) {
  const target = playerA.value?.id === playerId ? playerA.value : playerB.value
  if (target) {
    drillDownPlayer.value = target
    drillDownIndicatorKey.value = indicatorKey
    drillDownVisible.value = true
  }
}

function closeDrillDown() {
  drillDownVisible.value = false
}
</script>

<template>
  <div class="dashboard flex h-screen bg-[#0B1117] overflow-hidden">
    <div class="w-[280px] flex-shrink-0 hidden lg:block">
      <PlayerList />
    </div>

    <Transition name="drawer">
      <div v-if="sidebarOpen" class="fixed inset-0 z-50 lg:hidden">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="sidebarOpen = false" />
        <div class="absolute left-0 top-0 bottom-0 w-[280px]">
          <PlayerList />
          <button
            @click="sidebarOpen = false"
            class="absolute top-3 right-3 text-[#4A5568] hover:text-white transition-colors"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
      </div>
    </Transition>

    <main class="flex-1 flex flex-col overflow-hidden">
      <header class="lg:hidden px-4 py-3 border-b border-[#1A2A3A] flex items-center justify-between bg-[#0D1620]/90 backdrop-blur-md">
        <h1 class="text-sm font-bold text-white tracking-wide">国乒技术画像</h1>
        <button
          @click="sidebarOpen = true"
          class="text-[#A0AEC0] hover:text-white transition-colors"
        >
          <Menu class="w-5 h-5" />
        </button>
      </header>

      <div class="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4 lg:space-y-5">
        <div class="flex flex-col xl:flex-row gap-4 lg:gap-5">
          <div class="flex-1 min-w-0">
            <RadarCompare
              :player-a="playerA"
              :player-b="playerB"
              @drill-down="handleDrillDown"
            />
          </div>
        </div>

        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <IndicatorSelector
              v-model:indicator="selectedIndicator"
              :disabled="!playerA && !playerB"
            />
          </div>
          <TrendChart
            :player-a="playerA"
            :player-b="playerB"
            :indicator-key="selectedIndicator"
          />
        </div>

        <DrillDownTable
          :player="drillDownPlayer"
          :indicator-key="drillDownIndicatorKey"
          :visible="drillDownVisible"
          @close="closeDrillDown"
        />
      </div>
    </main>
  </div>
</template>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.25s ease;
}
.drawer-enter-active > div:last-child,
.drawer-leave-active > div:last-child {
  transition: transform 0.25s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
.drawer-enter-from > div:last-child,
.drawer-leave-to > div:last-child {
  transform: translateX(-100%);
}
</style>
