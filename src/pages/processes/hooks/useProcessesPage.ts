import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'

/* TODO: Remover legacy code */
import { setSearchProcessIdDialog, setSearchProcessIdDialogData } from "pages/diagram/features/bpmnSlice"

import { listStatesByProcessId } from "services/resources/processes/list-states"

export function useProcessesPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const navigateToHistory = useCallback((processId: string) => {
    navigate(`${processId}/history`)
  }, [navigate])

  const navigateToDiagram = useCallback(async (processId: string) => {
    const response = await listStatesByProcessId(processId)

    /* TODO: Remover legacy code */
    dispatch(setSearchProcessIdDialogData(response))
    dispatch(setSearchProcessIdDialog(true))

    navigate(`/dashboard/workflows/${response.workflow_id}/diagram`)
  }, [dispatch, navigate])

  return {
    navigateToHistory,
    navigateToDiagram,
  }
}