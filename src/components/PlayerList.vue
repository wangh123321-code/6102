<script setup lang="ts">
import { Search, Filter, X } from 'lucide-vue-next'
import type { Player, PlayStyle } from '../types'
import { usePlayerFilter } from '../composables/usePlayerFilter'
import { usePlayerSelection } from '../composables/usePlayerSelection'
import PlayerCard from './PlayerCard.vue'

const { searchQuery, selectedStyle, filteredPlayers, playStyleOptions, resetFilter } = usePlayerFilter()
const { selectPlayer, isSelected, isPlayerA, isPlayerB } = usePlayerSelection()

function getSlotLabel(player: Player): string {
  if (isPlayerA(player.id)) return 'A'
  if (isPlayerB(player.id)) return 'B'
  return ''
}
</script>

<template>
  <aside class="player-list flex flex-col h-full bg-[#0D1620] border-r border-[#1A2A3A]">
    <div class="px-4 pt-5 pb-3">
      <div class="flex items-center gap-2 mb-1">
        <div class="w-6 h-6 rounded-md bg-gradient-to-br from-[#2EC4B6] to-[#E63946] flex items-center justify-center">
          <span class="text-[10px] font-bold text-white">乒</span>
        </div>
        <h2 class="text-base font-bold text-white tracking-wide">
          选手列表
        </h2>
      </div>
      <p class="text-[10px] text-[#4A5568] ml-8">选择两位选手进行对比分析</p>
    </div>

    <div class="px-3 pb-2 space-y-2">
      <div class="relative">
        <Search class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#4A5568]" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索选手..."
          class="w-full pl-8 pr-3 py-1.5 bg-[#1A2A3A] border border-[#2D3748] rounded-lg text-xs text-[#CBD5E0] placeholder-[#4A5568] focus:outline-none focus:border-[#2EC4B6]/60 focus:ring-1 focus:ring-[#2EC4B6]/20 transition-all duration-200"
        />
      </div>

      <div class="relative">
        <Filter class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#4A5568]" />
        <select
          v-model="selectedStyle"
          class="w-full pl-8 pr-3 py-1.5 bg-[#1A2A3A] border border-[#2D3748] rounded-lg text-xs text-[#CBD5E0] appearance-none focus:outline-none focus:border-[#2EC4B6]/60 focus:ring-1 focus:ring-[#2EC4B6]/20 transition-all duration-200"
        >
          <option value="">全部打法</option>
          <option v-for="style in playStyleOptions" :key="style" :value="style">
            {{ style }}
          </option>
        </select>
      </div>

      <button
        v-if="searchQuery || selectedStyle"
        @click="resetFilter"
        class="flex items-center gap-1 text-[10px] text-[#2EC4B6] hover:text-[#2EC4B6]/80 transition-colors"
      >
        <X class="w-3 h-3" />
        重置筛选
      </button>
    </div>

    <div class="flex-1 overflow-y-auto px-3 pb-3 space-y-1 scrollbar-thin">
      <TransitionGroup name="list">
        <PlayerCard
          v-for="player in filteredPlayers"
          :key="player.id"
          :player="player"
          :selected="isSelected(player.id)"
          :slot-label="getSlotLabel(player)"
          @select="selectPlayer"
        />
      </TransitionGroup>
      <div v-if="filteredPlayers.length === 0" class="text-center py-8 text-[#4A5568] text-xs">
        无匹配选手
      </div>
    </div>
  </aside>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #2D3748;
  border-radius: 2px;
}
</style>
