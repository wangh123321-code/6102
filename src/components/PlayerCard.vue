<script setup lang="ts">
import type { Player } from '../types'

defineProps<{
  player: Player
  selected: boolean
  slotLabel: string
}>()

defineEmits<{
  select: [player: Player]
}>()
</script>

<template>
  <div
    class="player-card group relative flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200"
    :class="[
      selected
        ? slotLabel === 'A'
          ? 'bg-[#E63946]/15 border border-[#E63946]/50 shadow-[0_0_12px_rgba(230,57,70,0.2)]'
          : 'bg-[#F4A261]/15 border border-[#F4A261]/50 shadow-[0_0_12px_rgba(244,162,97,0.2)]'
        : 'bg-[#1A2A3A]/50 border border-transparent hover:bg-[#1A2A3A] hover:border-[#2EC4B6]/30',
    ]"
    @click="$emit('select', player)"
  >
    <div class="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-2 transition-all duration-200"
      :class="[
        selected
          ? slotLabel === 'A' ? 'ring-[#E63946]' : 'ring-[#F4A261]'
          : 'ring-transparent group-hover:ring-[#2EC4B6]/40',
      ]"
    >
      <img :src="player.avatar" :alt="player.name" class="w-full h-full object-cover" loading="lazy" />
    </div>
    <div class="flex-1 min-w-0">
      <div class="text-sm font-semibold truncate" :class="selected ? 'text-white' : 'text-[#CBD5E0]'">
        {{ player.name }}
      </div>
      <div class="flex items-center gap-1.5 mt-0.5">
        <span
          class="text-[10px] px-1.5 py-0.5 rounded-full"
          :class="[
            player.playStyle === '弧圈' ? 'bg-blue-500/20 text-blue-300' :
            player.playStyle === '快攻' ? 'bg-red-500/20 text-red-300' :
            player.playStyle === '削球' ? 'bg-green-500/20 text-green-300' :
            player.playStyle === '直拍横打' ? 'bg-purple-500/20 text-purple-300' :
            'bg-amber-500/20 text-amber-300',
          ]"
        >
          {{ player.playStyle }}
        </span>
      </div>
    </div>
    <div v-if="selected" class="flex-shrink-0">
      <span
        class="text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
        :class="slotLabel === 'A' ? 'bg-[#E63946] text-white' : 'bg-[#F4A261] text-[#0F1923]'"
      >
        {{ slotLabel }}
      </span>
    </div>
  </div>
</template>
