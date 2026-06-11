import { computed } from 'vue'
import type { Player, MatchRecord, IndicatorKey, MonthlyAggregate, Indicators } from '../types'
import { INDICATOR_LIST, MONTHS_12 } from '../types'
import matchRecordsData from '../assets/data/matchRecords.json'

const allRecords: MatchRecord[] = matchRecordsData as MatchRecord[]

export function getPlayerRecords(playerId: string): MatchRecord[] {
  return allRecords.filter(r => r.playerId === playerId)
}

export function averageIndicators(records: MatchRecord[]): Indicators {
  if (records.length === 0) {
    const zero: Record<string, number> = {}
    for (const ind of INDICATOR_LIST) {
      zero[ind.key] = 0
    }
    return zero as unknown as Indicators
  }
  const sum: Record<string, number> = {}
  for (const ind of INDICATOR_LIST) {
    sum[ind.key] = 0
  }
  for (const r of records) {
    for (const ind of INDICATOR_LIST) {
      sum[ind.key] += r.indicators[ind.key]
    }
  }
  const avg: Record<string, number> = {}
  for (const ind of INDICATOR_LIST) {
    avg[ind.key] = Math.round((sum[ind.key] / records.length) * 10) / 10
  }
  return avg as unknown as Indicators
}

export function getMonthlyData(playerId: string | null, indicatorKey: IndicatorKey): MonthlyAggregate[] {
  if (!playerId) return MONTHS_12.map(m => ({ month: m, value: null, hasData: false }))
  const records = getPlayerRecords(playerId)
  const monthMap = new Map<string, MatchRecord[]>()
  for (const r of records) {
    if (!monthMap.has(r.month)) monthMap.set(r.month, [])
    monthMap.get(r.month)!.push(r)
  }
  return MONTHS_12.map(month => {
    const monthRecords = monthMap.get(month)
    if (!monthRecords || monthRecords.length === 0) {
      return { month, value: null, hasData: false }
    }
    const sum = monthRecords.reduce((s, r) => s + r.indicators[indicatorKey], 0)
    const value = Math.round((sum / monthRecords.length) * 10) / 10
    return { month, value, hasData: true }
  })
}

export function getDrillDownRecords(playerId: string, indicatorKey?: IndicatorKey): MatchRecord[] {
  const records = getPlayerRecords(playerId)
  const sorted = [...records].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return sorted.slice(0, 20)
}

export function useChartData(
  getPlayerA: () => Player | null,
  getPlayerB: () => Player | null,
) {
  const radarValuesA = computed(() => {
    const playerA = getPlayerA()
    if (!playerA) return INDICATOR_LIST.map(() => 0)
    const records = getPlayerRecords(playerA.id)
    const avg = averageIndicators(records)
    return INDICATOR_LIST.map(ind => avg[ind.key])
  })

  const radarValuesB = computed(() => {
    const playerB = getPlayerB()
    if (!playerB) return INDICATOR_LIST.map(() => 0)
    const records = getPlayerRecords(playerB.id)
    const avg = averageIndicators(records)
    return INDICATOR_LIST.map(ind => avg[ind.key])
  })

  const alertDimensions = computed(() => {
    const alerts: number[] = []
    for (let i = 0; i < INDICATOR_LIST.length; i++) {
      const diff = Math.abs(radarValuesA.value[i] - radarValuesB.value[i])
      if (diff > 15) alerts.push(i)
    }
    return alerts
  })

  return {
    radarValuesA,
    radarValuesB,
    alertDimensions,
    allRecords,
  }
}
