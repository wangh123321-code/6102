import type { ComposeOption } from 'echarts/core'
import type { RadarSeriesOption } from 'echarts/charts'
import type { LineSeriesOption } from 'echarts/charts'
import type {
  TitleComponentOption,
  TooltipComponentOption,
  LegendComponentOption,
  RadarComponentOption,
  GridComponentOption,
} from 'echarts/components'
import { INDICATOR_LIST } from '../types'
import type { IndicatorMeta, MonthlyAggregate } from '../types'

type RadarOption = ComposeOption<
  | RadarSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | RadarComponentOption
>

type LineOption = ComposeOption<
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | GridComponentOption
>

const PLAYER_A_COLOR = '#E63946'
const PLAYER_B_COLOR = '#F4A261'
const ALERT_COLOR = '#FF6B6B'
const BG_COLOR = '#0F1923'
const GRID_COLOR = '#1A2A3A'
const TEXT_COLOR = '#A0AEC0'

export function buildRadarOption(
  playerAName: string,
  playerBName: string,
  valuesA: number[],
  valuesB: number[],
  indicatorList: IndicatorMeta[],
): RadarOption {
  const diffThreshold = 15
  const alertDimensions = new Set<number>()

  for (let i = 0; i < valuesA.length; i++) {
    if (Math.abs(valuesA[i] - valuesB[i]) > diffThreshold) {
      alertDimensions.add(i)
    }
  }

  return {
    backgroundColor: 'transparent',
    animation: false,
    title: {
      text: '八维技术指标对比',
      left: 'center',
      top: 10,
      textStyle: { color: TEXT_COLOR, fontSize: 16, fontWeight: 600 },
    },
    legend: {
      data: [playerAName, playerBName],
      bottom: 12,
      textStyle: { color: TEXT_COLOR, fontSize: 12 },
      itemWidth: 14,
      itemHeight: 8,
    },
    radar: {
      indicator: indicatorList.map(ind => ({
        name: ind.label,
        max: ind.max,
      })),
      center: ['50%', '52%'],
      radius: '58%',
      shape: 'polygon',
      splitNumber: 5,
      axisName: {
        color: TEXT_COLOR,
        fontSize: 11,
        padding: [6, 6],
      },
      splitLine: { lineStyle: { color: GRID_COLOR } },
      splitArea: { areaStyle: { color: ['rgba(26,42,58,0.3)', 'rgba(26,42,58,0.1)'] } },
      axisLine: { lineStyle: { color: GRID_COLOR } },
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(15,25,35,0.95)',
      borderColor: GRID_COLOR,
      textStyle: { color: '#E2E8F0' },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: valuesA,
            name: playerAName,
            symbol: 'circle',
            symbolSize: ((_val: number, params: { dataIndex: number }) =>
              alertDimensions.has(params.dataIndex) ? 12 : 8) as unknown as number,
            lineStyle: { color: PLAYER_A_COLOR, width: 2 },
            areaStyle: { color: PLAYER_A_COLOR, opacity: 0.2 },
            itemStyle: {
              color: (params: { dataIndex: number }) =>
                alertDimensions.has(params.dataIndex) ? ALERT_COLOR : PLAYER_A_COLOR,
              borderColor: ((params: { dataIndex: number }) =>
                alertDimensions.has(params.dataIndex) ? '#FF4444' : PLAYER_A_COLOR) as unknown as string,
              borderWidth: ((params: { dataIndex: number }) =>
                alertDimensions.has(params.dataIndex) ? 3 : 1) as unknown as number,
            },
          },
          {
            value: valuesB,
            name: playerBName,
            symbol: 'circle',
            symbolSize: ((_val: number, params: { dataIndex: number }) =>
              alertDimensions.has(params.dataIndex) ? 12 : 8) as unknown as number,
            lineStyle: { color: PLAYER_B_COLOR, width: 2 },
            areaStyle: { color: PLAYER_B_COLOR, opacity: 0.2 },
            itemStyle: {
              color: (params: { dataIndex: number }) =>
                alertDimensions.has(params.dataIndex) ? ALERT_COLOR : PLAYER_B_COLOR,
              borderColor: ((params: { dataIndex: number }) =>
                alertDimensions.has(params.dataIndex) ? '#FF4444' : PLAYER_B_COLOR) as unknown as string,
              borderWidth: ((params: { dataIndex: number }) =>
                alertDimensions.has(params.dataIndex) ? 3 : 1) as unknown as number,
            },
          },
        ],
        emphasis: {
          lineStyle: { width: 3 },
        },
      },
    ],
  }
}

interface TrendDataItem {
  value: number
  hasData: boolean
  lineStyle: { type: string; width: number; color: string }
  symbol: string
  symbolSize: number
  itemStyle: { color: string; opacity?: number; borderColor?: string; borderWidth?: number }
}

function interpolateValue(data: MonthlyAggregate[], index: number): number {
  let prevIdx = index - 1
  while (prevIdx >= 0 && !data[prevIdx].hasData) prevIdx--
  let nextIdx = index + 1
  while (nextIdx < data.length && !data[nextIdx].hasData) nextIdx++

  const prevVal = prevIdx >= 0 ? data[prevIdx].value : null
  const nextVal = nextIdx < data.length ? data[nextIdx].value : null

  if (prevVal !== null && nextVal !== null) {
    const ratio = (index - prevIdx) / (nextIdx - prevIdx)
    return Math.round((prevVal + (nextVal - prevVal) * ratio) * 10) / 10
  }
  if (prevVal !== null) return prevVal
  if (nextVal !== null) return nextVal
  return 0
}

function buildSeriesData(
  monthlyData: MonthlyAggregate[],
  color: string,
): TrendDataItem[] {
  return monthlyData.map((d, i) => {
    const nextMissing = i < monthlyData.length - 1 && !monthlyData[i + 1].hasData
    const currentMissing = !d.hasData
    const needDashed = currentMissing || nextMissing

    if (!d.hasData) {
      const interpVal = interpolateValue(monthlyData, i)
      return {
        value: interpVal,
        hasData: false,
        lineStyle: { type: 'dashed', width: 2, color },
        symbol: 'diamond',
        symbolSize: 6,
        itemStyle: { color, opacity: 0.35, borderColor: color, borderWidth: 1 },
      }
    }

    return {
      value: d.value!,
      hasData: true,
      lineStyle: { type: needDashed ? 'dashed' : 'solid', width: 2, color },
      symbol: 'circle',
      symbolSize: 7,
      itemStyle: { color, borderColor: '#0F1923', borderWidth: 2 },
    }
  })
}

export function buildTrendOption(
  indicatorLabel: string,
  months: string[],
  playerAData: MonthlyAggregate[],
  playerBData: MonthlyAggregate[],
  playerAName: string,
  playerBName: string,
): LineOption {
  const seriesDataA = buildSeriesData(playerAData, PLAYER_A_COLOR)
  const seriesDataB = buildSeriesData(playerBData, PLAYER_B_COLOR)

  return {
    backgroundColor: 'transparent',
    animation: false,
    title: {
      text: `${indicatorLabel} — 最近12个月趋势`,
      left: 'center',
      top: 8,
      textStyle: { color: TEXT_COLOR, fontSize: 16, fontWeight: 600 },
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(15,25,35,0.95)',
      borderColor: GRID_COLOR,
      textStyle: { color: '#E2E8F0', fontSize: 12 },
      formatter(params: unknown) {
        const p = params as { axisValue: string; marker: string; seriesName: string; data: TrendDataItem | number; color: string }[]
        if (!Array.isArray(p)) return ''
        let html = `<div style="margin-bottom:6px;font-weight:600;font-size:13px">${p[0]?.axisValue ?? ''}</div>`
        for (const item of p) {
          const d = typeof item.data === 'object' && item.data !== null ? item.data as TrendDataItem : null
          const hasData = d?.hasData ?? true
          const val = d ? `${d.value.toFixed(1)}%` : '—'
          html += `<div style="display:flex;align-items:center;gap:6px;margin:3px 0;font-size:12px">`
          html += `${item.marker}`
          html += `<span>${item.seriesName}: </span>`
          if (hasData) {
            html += `<span style="font-weight:600">${val}</span>`
          } else {
            html += `<span style="font-weight:600;color:#4A5568">${val}</span>`
            html += `<span style="color:#FF6B6B;font-size:11px;margin-left:4px;background:rgba(255,107,107,0.1);padding:1px 4px;border-radius:3px">无赛事数据</span>`
          }
          html += `</div>`
        }
        return html
      },
    },
    legend: {
      data: [playerAName, playerBName],
      bottom: 8,
      textStyle: { color: TEXT_COLOR, fontSize: 12 },
      itemWidth: 14,
      itemHeight: 8,
    },
    grid: {
      left: 50,
      right: 20,
      top: 50,
      bottom: 50,
    },
    xAxis: {
      type: 'category',
      data: months,
      axisLine: { lineStyle: { color: GRID_COLOR } },
      axisLabel: { color: TEXT_COLOR, fontSize: 10, rotate: 30 },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: GRID_COLOR } },
      axisLabel: { color: TEXT_COLOR, fontSize: 10, formatter: '{value}%' },
      splitLine: { lineStyle: { color: GRID_COLOR, type: 'dashed' } },
    },
    series: [
      {
        type: 'line',
        name: playerAName,
        data: seriesDataA as unknown as LineSeriesOption['data'],
        color: PLAYER_A_COLOR,
        connectNulls: true,
        lineStyle: { width: 2, color: PLAYER_A_COLOR },
        emphasis: { focus: 'series' as const },
      },
      {
        type: 'line',
        name: playerBName,
        data: seriesDataB as unknown as LineSeriesOption['data'],
        color: PLAYER_B_COLOR,
        connectNulls: true,
        lineStyle: { width: 2, color: PLAYER_B_COLOR },
        emphasis: { focus: 'series' as const },
      },
    ],
  }
}
