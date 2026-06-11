import { computed } from 'vue'
import type { IndicatorKey } from '../types'
import { INDICATOR_LIST } from '../types'

export interface TrainingPlan {
  id: number
  name: string
  targetIndicators: IndicatorKey[]
  expectedImprovement: string
  suggestedHours: number
}

export const TRAINING_PLANS: TrainingPlan[] = [
  { id: 1, name: '正手多点拉球训练', targetIndicators: ['forehandWinRate'], expectedImprovement: '正手得分率 +5~8%', suggestedHours: 6 },
  { id: 2, name: '正手走位攻球强化', targetIndicators: ['forehandWinRate', 'speedIndex'], expectedImprovement: '正手得分率 +4~7%, 速度指数 +3~5', suggestedHours: 8 },
  { id: 3, name: '正手发力协调性训练', targetIndicators: ['forehandWinRate', 'placementRate'], expectedImprovement: '正手得分率 +3~6%, 落点变化率 +4~6', suggestedHours: 5 },
  { id: 4, name: '反手拨球稳定性训练', targetIndicators: ['backhandStability'], expectedImprovement: '反手稳定性 +6~10%', suggestedHours: 5 },
  { id: 5, name: '反手变线能力训练', targetIndicators: ['backhandStability', 'placementRate'], expectedImprovement: '反手稳定性 +4~7%, 落点变化率 +3~5', suggestedHours: 6 },
  { id: 6, name: '反手衔接正手转换训练', targetIndicators: ['backhandStability', 'speedIndex'], expectedImprovement: '反手稳定性 +3~5%, 速度指数 +3~6', suggestedHours: 7 },
  { id: 7, name: '发球抢攻套路训练', targetIndicators: ['serveAttackRate'], expectedImprovement: '发球抢攻占比 +5~9%', suggestedHours: 4 },
  { id: 8, name: '发球变化与抢攻配合', targetIndicators: ['serveAttackRate', 'placementRate'], expectedImprovement: '发球抢攻占比 +4~7%, 落点变化率 +3~5', suggestedHours: 6 },
  { id: 9, name: '发球后第三板衔接训练', targetIndicators: ['serveAttackRate', 'forehandWinRate'], expectedImprovement: '发球抢攻占比 +3~6%, 正手得分率 +3~5', suggestedHours: 5 },
  { id: 10, name: '接发球摆短拧拉训练', targetIndicators: ['receiveWinRate'], expectedImprovement: '接发球得分率 +5~8%', suggestedHours: 6 },
  { id: 11, name: '接发球抢攻意识训练', targetIndicators: ['receiveWinRate', 'serveAttackRate'], expectedImprovement: '接发球得分率 +4~7%, 发球抢攻占比 +2~4', suggestedHours: 5 },
  { id: 12, name: '接发球落点控制训练', targetIndicators: ['receiveWinRate', 'placementRate'], expectedImprovement: '接发球得分率 +3~6%, 落点变化率 +4~6', suggestedHours: 6 },
  { id: 13, name: '相持中转攻训练', targetIndicators: ['rallyConvertRate'], expectedImprovement: '相持转攻率 +5~9%', suggestedHours: 7 },
  { id: 14, name: '相持节奏变化训练', targetIndicators: ['rallyConvertRate', 'speedIndex'], expectedImprovement: '相持转攻率 +4~7%, 速度指数 +3~5', suggestedHours: 6 },
  { id: 15, name: '相持落点调动训练', targetIndicators: ['rallyConvertRate', 'placementRate'], expectedImprovement: '相持转攻率 +3~6%, 落点变化率 +4~6', suggestedHours: 8 },
  { id: 16, name: '台内搓摆控制训练', targetIndicators: ['shortGameRate'], expectedImprovement: '台内控制率 +6~10%', suggestedHours: 5 },
  { id: 17, name: '台内拧拉起板训练', targetIndicators: ['shortGameRate', 'forehandWinRate'], expectedImprovement: '台内控制率 +4~7%, 正手得分率 +3~5', suggestedHours: 6 },
  { id: 18, name: '台内短球衔接抢攻训练', targetIndicators: ['shortGameRate', 'serveAttackRate'], expectedImprovement: '台内控制率 +3~6%, 发球抢攻占比 +3~5', suggestedHours: 5 },
  { id: 19, name: '步法移动速度训练', targetIndicators: ['speedIndex'], expectedImprovement: '速度指数 +5~9%', suggestedHours: 8 },
  { id: 20, name: '快速衔接攻防转换训练', targetIndicators: ['speedIndex', 'rallyConvertRate'], expectedImprovement: '速度指数 +4~7%, 相持转攻率 +3~5', suggestedHours: 7 },
  { id: 21, name: '反应速度专项训练', targetIndicators: ['speedIndex', 'receiveWinRate'], expectedImprovement: '速度指数 +3~6%, 接发球得分率 +3~5', suggestedHours: 6 },
  { id: 22, name: '落点变化意识训练', targetIndicators: ['placementRate'], expectedImprovement: '落点变化率 +5~9%', suggestedHours: 5 },
  { id: 23, name: '大角度调动训练', targetIndicators: ['placementRate', 'speedIndex'], expectedImprovement: '落点变化率 +4~7%, 速度指数 +2~4', suggestedHours: 6 },
  { id: 24, name: '落点与力量结合训练', targetIndicators: ['placementRate', 'forehandWinRate'], expectedImprovement: '落点变化率 +3~6%, 正手得分率 +3~5', suggestedHours: 7 },
  { id: 25, name: '正反手衔接综合训练', targetIndicators: ['forehandWinRate', 'backhandStability', 'speedIndex'], expectedImprovement: '正手得分率 +2~4%, 反手稳定性 +2~4%, 速度指数 +3~5', suggestedHours: 10 },
  { id: 26, name: '发接发一体化训练', targetIndicators: ['serveAttackRate', 'receiveWinRate', 'shortGameRate'], expectedImprovement: '发球抢攻占比 +3~5%, 接发球得分率 +3~5%, 台内控制率 +2~4', suggestedHours: 8 },
  { id: 27, name: '相持攻防转换综合训练', targetIndicators: ['rallyConvertRate', 'backhandStability', 'placementRate'], expectedImprovement: '相持转攻率 +3~5%, 反手稳定性 +2~4%, 落点变化率 +2~4', suggestedHours: 9 },
  { id: 28, name: '全方位速度提升训练', targetIndicators: ['speedIndex', 'forehandWinRate', 'receiveWinRate'], expectedImprovement: '速度指数 +3~5%, 正手得分率 +2~4%, 接发球得分率 +2~4', suggestedHours: 10 },
  { id: 29, name: '落点控制与相持综合训练', targetIndicators: ['placementRate', 'rallyConvertRate', 'shortGameRate'], expectedImprovement: '落点变化率 +3~5%, 相持转攻率 +2~4%, 台内控制率 +2~4', suggestedHours: 8 },
  { id: 30, name: '全面技术补强训练', targetIndicators: ['forehandWinRate', 'backhandStability', 'rallyConvertRate', 'placementRate'], expectedImprovement: '各指标均衡提升 +2~4%', suggestedHours: 12 },
]

export interface WeakIndicator {
  key: IndicatorKey
  label: string
  value: number
  rank: number
}

export function identifyWeakIndicators(indicators: Record<IndicatorKey, number>, threshold: number = 0.3, absoluteFloor: number = 70): WeakIndicator[] {
  const entries = INDICATOR_LIST.map((meta) => ({
    key: meta.key,
    label: meta.label,
    value: indicators[meta.key],
    rank: 0,
  }))

  const sorted = [...entries].sort((a, b) => a.value - b.value)

  const weakCount = Math.max(1, Math.ceil(INDICATOR_LIST.length * threshold))

  const weakKeys = new Set<IndicatorKey>()
  for (let i = 0; i < weakCount; i++) {
    if (sorted[i].value < absoluteFloor) {
      weakKeys.add(sorted[i].key)
    }
  }

  return entries
    .filter(e => weakKeys.has(e.key))
    .map(e => ({ ...e, rank: sorted.findIndex(s => s.key === e.key) + 1 }))
}

export function matchTrainingPlans(weakIndicators: WeakIndicator[]): TrainingPlan[] {
  if (weakIndicators.length === 0) return []

  const weakKeys = new Set(weakIndicators.map(w => w.key))

  const scored = TRAINING_PLANS.map(plan => {
    const matchCount = plan.targetIndicators.filter(k => weakKeys.has(k)).length
    const coverage = matchCount / plan.targetIndicators.length
    const relevance = matchCount / weakKeys.size
    const score = matchCount * 10 + coverage * 5 + relevance * 3
    return { plan, score, matchCount }
  })

  scored.sort((a, b) => {
    if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount
    return b.score - a.score
  })

  const results: TrainingPlan[] = []

  for (const { plan, matchCount } of scored) {
    if (matchCount === 0) break
    if (results.length >= 3) break
    results.push(plan)
  }

  return results
}

export function useTrainingAdvice(indicatorsGetter: () => Record<IndicatorKey, number> | null) {
  const weakIndicators = computed(() => {
    const indicators = indicatorsGetter()
    if (!indicators) return []
    return identifyWeakIndicators(indicators)
  })

  const hasWeakness = computed(() => weakIndicators.value.length > 0)

  const adviceList = computed(() => {
    if (!hasWeakness.value) return []
    return matchTrainingPlans(weakIndicators.value)
  })

  return {
    weakIndicators,
    hasWeakness,
    adviceList,
  }
}
