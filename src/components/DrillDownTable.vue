<script setup lang="ts">
import { ref, watch } from 'vue'
import { ChevronDown, X } from 'lucide-vue-next'
import type { Player, IndicatorKey, MatchRecord } from '../types'
import { INDICATOR_LIST } from '../types'
import { getDrillDownRecords } from '../composables/useChartData'

const props = defineProps<{
  player: Player | null
  indicatorKey: IndicatorKey | null
  visible: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const records = ref<MatchRecord[]>([])

watch(
  () => [props.player, props.indicatorKey, props.visible],
  () => {
    if (props.visible && props.player && props.indicatorKey) {
      records.value = getDrillDownRecords(props.player.id, props.indicatorKey)
    }
  },
  { immediate: true },
)

function getIndicatorValue(record: MatchRecord, key: IndicatorKey | null): string {
  if (!key) return '—'
  return record.indicators[key].toFixed(1) + '%'
}

function getIndicatorLabel(key: IndicatorKey | null): string {
  if (!key) return ''
  return INDICATOR_LIST.find(i => i.key === key)?.label ?? key
}

function formatDate(dateStr: string): string {
  return dateStr.replace(/-/g, '/')
}
</script>

<template>
  <Transition name="slide">
    <div
      v-if="visible && player && indicatorKey"
      class="drill-down bg-[#0D1620] border-t border-[#1A2A3A] rounded-b-xl"
    >
      <div class="flex items-center justify-between px-4 py-2.5 border-b border-[#1A2A3A]">
        <div class="flex items-center gap-2">
          <ChevronDown class="w-4 h-4 text-[#2EC4B6]" />
          <span class="text-xs font-semibold text-white">
            {{ player.name }} — {{ getIndicatorLabel(indicatorKey) }} · 最近20场明细
          </span>
        </div>
        <button
          @click="$emit('close')"
          class="text-[#4A5568] hover:text-[#A0AEC0] transition-colors"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead>
            <tr class="text-[#4A5568] border-b border-[#1A2A3A]">
              <th class="px-4 py-2 text-left font-medium">#</th>
              <th class="px-4 py-2 text-left font-medium">日期</th>
              <th class="px-4 py-2 text-left font-medium">对手</th>
              <th class="px-4 py-2 text-right font-medium">{{ getIndicatorLabel(indicatorKey) }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(record, idx) in records"
              :key="record.matchId"
              class="border-b border-[#1A2A3A]/50 hover:bg-[#1A2A3A]/30 transition-colors"
            >
              <td class="px-4 py-2 text-[#4A5568]">{{ idx + 1 }}</td>
              <td class="px-4 py-2 text-[#A0AEC0]">{{ formatDate(record.date) }}</td>
              <td class="px-4 py-2 text-[#CBD5E0]">{{ record.opponent }}</td>
              <td class="px-4 py-2 text-right font-mono font-semibold text-[13px]"
                :class="[
                  record.indicators[indicatorKey] >= 70 ? 'text-[#2EC4B6]' :
                  record.indicators[indicatorKey] >= 50 ? 'text-[#F4A261]' :
                  'text-[#E63946]',
                ]"
              >
                {{ getIndicatorValue(record, indicatorKey) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
