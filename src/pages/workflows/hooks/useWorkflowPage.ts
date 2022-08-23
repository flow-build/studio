import { useCallback} from "react"
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack';
import { createProcessByName } from "services/resources/processes/create-by-name";

export function useWorkflowPage() {
  const navigate = useNavigate()

  const { enqueueSnackbar } = useSnackbar();

  const navigateToProcess = useCallback((workflowId: string) => {
    navigate(`${workflowId}/processes`)
  }, [navigate])

  const showNotification = useCallback((message: string) => {
    enqueueSnackbar(
      `Processo ${message} criado!`,
      { autoHideDuration: 2000, variant: 'success' }
    );
  }, [enqueueSnackbar])

  const createProcess = useCallback(async (processName: string, workflowId: string) => {
    try {
      const response = await createProcessByName(processName);
      showNotification(processName);
  
      
    } catch (error) {
      console.error(error)
    }
  }, [showNotification])

  const navigateToDiagram = useCallback((workflowId: string) => {
    navigate(`${workflowId}/diagram`)
  }, [navigate])
 
  return {
    navigateToProcess,
    createProcess,
    navigateToDiagram,
  }
}