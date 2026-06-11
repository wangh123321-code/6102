<script setup lang="ts">
import type { IndicatorKey } from '../types'
import { useTrainingAdvice } from '../composables/useTrainingAdvice'
import type { TrainingPlan, WeakIndicator } from '../composables/useTrainingAdvice'

const props = defineProps<{
  playerName: string
  indicators: Record<IndicatorKey, number> | null
}>()

const { weakIndicators, hasWeakness, adviceList } = useTrainingAdvice(
  () => props.indicators,
)
</script>

<template>
  <div v-if="indicators" class="training-advice-card bg-[#0F1923] rounded-xl border border-[#1A2A3A] p-4">
    <div class="flex items-center gap-2 mb-3">
      <span class="text-[#2EC4B6] text-xs font-semibold tracking-wide">🎯 训练建议</span>
      <span class="text-[#4A5568] text-[10px]">— {{ playerName }}</span>
    </div>

    <div v-if="!hasWeakness" class="text-center py-4">
      <span class="text-[#2EC4B6] text-sm">✓ 无明显弱项</span>
      <p class="text-[#4A5568] text-[10px] mt-1">各项指标均处于较高水平</p>
    </div>

    <template v-else>
      <div class="mb-3 flex flex-wrap gap-1.5">
        <span
          v-for="w in weakIndicators"
          :key="w.key"
          class="px-2 py-0.5 rounded text-[10px] font-medium bg-[#FF6B6B]/10 text-[#FF6B6B] border border-[#FF6B6B]/20"
        >
          {{ w.label }} {{ w.value }}
        </span>
      </div>

      <div class="space-y-2">
        <div
          v-for="(plan, idx) in adviceList"
          :key="plan.id"
          class="rounded-lg border border-[#1A2A3A] bg-[#0D1620]/80 p-3"
        >
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-white text-xs font-medium">
              <span class="text-[#2EC4B6] mr-1.5">{{ idx + 1 }}</span>
              {{ plan.name }}
            </span>
            <span class="text-[10px] text-[#4A5568] bg-[#1A2A3A] px-2 py-0.5 rounded">
              {{ plan.suggestedHours }} 课时
            </span>
          </div>
          <p class="text-[10px] text-[#A0AEC0] leading-relaxed">
            {{ plan.expectedImprovement }}
          </p>
        </div>
      </div>
    </template>
  </div>
</template>
