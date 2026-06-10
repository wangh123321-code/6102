import { ref, computed } from 'vue'
import type { Player } from '../types'

const selectedPlayers = ref<Player[]>([])

export function usePlayerSelection() {
  const playerA = computed(() => selectedPlayers.value[0] ?? null)
  const playerB = computed(() => selectedPlayers.value[1] ?? null)

  function selectPlayer(player: Player) {
    const idx = selectedPlayers.value.findIndex(p => p.id === player.id)
    if (idx !== -1) {
      selectedPlayers.value.splice(idx, 1)
      return
    }
    if (selectedPlayers.value.length >= 2) {
      selectedPlayers.value.shift()
    }
    selectedPlayers.value.push(player)
  }

  function isSelected(playerId: string): boolean {
    return selectedPlayers.value.some(p => p.id === playerId)
  }

  function isPlayerA(playerId: string): boolean {
    return selectedPlayers.value[0]?.id === playerId
  }

  function isPlayerB(playerId: string): boolean {
    return selectedPlayers.value[1]?.id === playerId
  }

  function clearSelection() {
    selectedPlayers.value = []
  }

  return {
    selectedPlayers,
    playerA,
    playerB,
    selectPlayer,
    isSelected,
    isPlayerA,
    isPlayerB,
    clearSelection,
  }
}
