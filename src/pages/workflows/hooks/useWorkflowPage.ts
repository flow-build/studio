import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setStartProcessDialog } from "store/slices/workflow-page";

export function useWorkflowPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToProcess = useCallback(
    (workflowId: string) => {
      navigate(`${workflowId}/processes`);
    },
    [navigate]
  );

  const createProcess = useCallback(
    async (processName: string, workflowId: string) => {
      try {
        dispatch(
          setStartProcessDialog({
            isVisible: true,
            data: { workflowId, processName },
          })
        );
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch]
  );

  const navigateToDiagram = useCallback(
    (workflowId: string) => {
      navigate(`${workflowId}/diagram`);
    },
    [navigate]
  );

  return {
    navigateToProcess,
    createProcess,
    navigateToDiagram,
  };
}
