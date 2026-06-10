<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import type { Player, IndicatorKey } from '../types'
import { MONTHS_12, INDICATOR_LIST } from '../types'
import echarts from '../config/echarts'
import { getMonthlyData } from '../composables/useChartData'
import { buildTrendOption } from '../utils/chartOptions'

const props = defineProps<{
  playerA: Player | null
  playerB: Player | null
  indicatorKey: IndicatorKey
}>()

const chartRef = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null

function renderChart() {
  if (!chartInstance || !chartRef.value) return
  const dataA = getMonthlyData(props.playerA?.id ?? null, props.indicatorKey)
  const dataB = getMonthlyData(props.playerB?.id ?? null, props.indicatorKey)
  const indicatorLabel = (() => {
    const found = INDICATOR_LIST.find(i => i.key === props.indicatorKey)
    return found?.label ?? props.indicatorKey
  })()
  const option = buildTrendOption(
    indicatorLabel,
    MONTHS_12,
    dataA,
    dataB,
    props.playerA?.name ?? '选手A',
    props.playerB?.name ?? '选手B',
  )
  chartInstance.setOption(option, { notMerge: true })
}

function handleResize() {
  chartInstance?.resize()
}

onMounted(() => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
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
  () => [props.playerA?.id, props.playerB?.id, props.indicatorKey],
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
  <div class="trend-chart relative bg-[#0F1923] rounded-xl border border-[#1A2A3A] overflow-hidden">
    <div ref="chartRef" class="w-full h-full min-h-[260px]" />
    <div
      v-if="!playerA && !playerB"
      class="absolute inset-0 flex items-center justify-center bg-[#0F1923]/80"
    >
      <div class="text-center">
        <div class="text-2xl mb-2 opacity-30">📈</div>
        <p class="text-[#4A5568] text-sm">选择选手后查看趋势</p>
      </div>
    </div>
  </div>
</template>
