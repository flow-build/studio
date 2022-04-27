import { useCallback } from "react"
import { useNavigate } from 'react-router-dom'

export function useProcessesPage() {
  const navigate = useNavigate()

  const navigateToHistory = useCallback((processId: string) => {
    navigate(`${processId}/history`)
  }, [navigate])

  return {
    navigateToHistory,
  }
}