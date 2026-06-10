<script setup lang="ts">
import type { IndicatorKey, IndicatorMeta } from '../types'
import { INDICATOR_LIST } from '../types'

const selectedIndicator = defineModel<IndicatorKey>('indicator', { required: true })

defineProps<{
  disabled: boolean
}>()

function selectIndicator(meta: IndicatorMeta) {
  selectedIndicator.value = meta.key
}
</script>

<template>
  <div class="indicator-selector flex flex-wrap gap-1.5">
    <button
      v-for="ind in INDICATOR_LIST"
      :key="ind.key"
      @click="selectIndicator(ind)"
      :disabled="disabled"
      class="px-2.5 py-1 rounded-md text-[11px] font-medium transition-all duration-200 border"
      :class="[
        selectedIndicator === ind.key
          ? 'bg-[#2EC4B6]/20 text-[#2EC4B6] border-[#2EC4B6]/40 shadow-[0_0_8px_rgba(46,196,182,0.15)]'
          : 'bg-[#1A2A3A]/60 text-[#4A5568] border-transparent hover:text-[#A0AEC0] hover:border-[#2D3748]',
        disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
      ]"
    >
      {{ ind.label }}
    </button>
  </div>
</template>
