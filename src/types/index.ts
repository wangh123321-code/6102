export type PlayStyle = '弧圈' | '快攻' | '削球' | '直拍横打' | '弧圈快攻'

export interface Player {
  id: string
  name: string
  playStyle: PlayStyle
  avatar: string
}

export interface Indicators {
  forehandWinRate: number
  backhandStability: number
  serveAttackRate: number
  receiveWinRate: number
  rallyConvertRate: number
  shortGameRate: number
  speedIndex: number
  placementRate: number
}

export type IndicatorKey = keyof Indicators

export interface MatchRecord {
  playerId: string
  matchId: string
  opponent: string
  date: string
  month: string
  indicators: Indicators
}

export interface MonthlyAggregate {
  month: string
  value: number | null
  hasData: boolean
}

export interface IndicatorMeta {
  key: IndicatorKey
  label: string
  max: number
}

export const INDICATOR_LIST: IndicatorMeta[] = [
  { key: 'forehandWinRate', label: '正手得分率', max: 100 },
  { key: 'backhandStability', label: '反手稳定性', max: 100 },
  { key: 'serveAttackRate', label: '发球抢攻占比', max: 100 },
  { key: 'receiveWinRate', label: '接发球得分率', max: 100 },
  { key: 'rallyConvertRate', label: '相持转攻率', max: 100 },
  { key: 'shortGameRate', label: '台内控制率', max: 100 },
  { key: 'speedIndex', label: '速度指数', max: 100 },
  { key: 'placementRate', label: '落点变化率', max: 100 },
]

export const PLAY_STYLES: PlayStyle[] = ['弧圈', '快攻', '削球', '直拍横打', '弧圈快攻']

export const MONTHS_12: string[] = [
  '2025-06', '2025-07', '2025-08', '2025-09', '2025-10', '2025-11',
  '2025-12', '2026-01', '2026-02', '2026-03', '2026-04', '2026-05',
]
