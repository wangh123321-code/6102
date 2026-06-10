import { ref, computed } from 'vue'
import type { Player, PlayStyle } from '../types'
import { PLAY_STYLES } from '../types'
import playersData from '../assets/data/players.json'

const allPlayers: Player[] = playersData as Player[]

export function usePlayerFilter() {
  const searchQuery = ref('')
  const selectedStyle = ref<PlayStyle | ''>('')

  const filteredPlayers = computed(() => {
    let result = allPlayers
    if (selectedStyle.value) {
      result = result.filter(p => p.playStyle === selectedStyle.value)
    }
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.trim().toLowerCase()
      result = result.filter(p => p.name.toLowerCase().includes(q))
    }
    return result
  })

  const playStyleOptions = PLAY_STYLES

  function resetFilter() {
    searchQuery.value = ''
    selectedStyle.value = ''
  }

  return {
    allPlayers,
    searchQuery,
    selectedStyle,
    filteredPlayers,
    playStyleOptions,
    resetFilter,
  }
}
