<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import type { Player, IndicatorKey } from '../types'
import { INDICATOR_LIST } from '../types'
import echarts from '../config/echarts'
import { useChartData } from '../composables/useChartData'
import { buildRadarOption } from '../utils/chartOptions'

const props = defineProps<{
  playerA: Player | null
  playerB: Player | null
}>()

const emit = defineEmits<{
  drillDown: [playerId: string, indicatorKey: IndicatorKey]
}>()

const chartRef = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null

const { radarValuesA, radarValuesB, alertDimensions } = useChartData(
  () => props.playerA,
  () => props.playerB,
)

function renderChart() {
  if (!chartInstance || !chartRef.value) return
  const option = buildRadarOption(
    props.playerA?.name ?? '选手A',
    props.playerB?.name ?? '选手B',
    radarValuesA.value,
    radarValuesB.value,
    INDICATOR_LIST,
  )
  chartInstance.setOption(option, { notMerge: true })
}

function handleClick(params: unknown) {
  const p = params as { componentType?: string; seriesType?: string; name?: string; dataIndex?: number }
  if (p.componentType === 'series' && p.seriesType === 'radar' && p.dataIndex !== undefined) {
    const indicatorKey = INDICATOR_LIST[p.dataIndex]?.key
    if (!indicatorKey) return
    let targetPlayer: Player | null = null
    if (p.name === props.playerA?.name) {
      targetPlayer = props.playerA
    } else if (p.name === props.playerB?.name) {
      targetPlayer = props.playerB
    }
    if (targetPlayer) {
      emit('drillDown', targetPlayer.id, indicatorKey)
    }
  }
}

function handleResize() {
  chartInstance?.resize()
}

onMounted(() => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    chartInstance.on('click', handleClick)
    renderChart()
  }
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  chartInstance?.dispose()
  chartInstance = null
  window.removeEventListener('resize', handleResize)
})

let renderTimer: number | null = null

watch(
  () => [props.playerA?.id, props.playerB?.id, radarValuesA.value.join(','), radarValuesB.value.join(',')],
  () => {
    if (renderTimer) cancelAnimationFrame(renderTimer)
    renderTimer = requestAnimationFrame(() => {
      renderChart()
      renderTimer = null
    })
  },
)
</script>

<template>
  <div class="radar-compare relative bg-[#0F1923] rounded-xl border border-[#1A2A3A] overflow-hidden">
    <div class="absolute top-3 right-3 z-10 flex items-center gap-2">
      <span
        v-if="alertDimensions.length > 0"
        class="text-[10px] text-[#FF6B6B] bg-[#FF6B6B]/10 px-2 py-1 rounded animate-pulse-alert"
      >
        {{ alertDimensions.length }}项指标差异超15%
      </span>
      <span class="text-[10px] text-[#4A5568] bg-[#1A2A3A]/80 px-2 py-1 rounded">
        点击维度点查看明细
      </span>
    </div>
    <div ref="chartRef" class="w-full h-full min-h-[340px]" />
    <div
      v-if="!playerA && !playerB"
      class="absolute inset-0 flex items-center justify-center bg-[#0F1923]/80"
    >
      <div class="text-center">
        <div class="text-2xl mb-2 opacity-30">📊</div>
        <p class="text-[#4A5568] text-sm">请在左侧选择选手进行对比</p>
      </div>
    </div>
  </div>
</template>
