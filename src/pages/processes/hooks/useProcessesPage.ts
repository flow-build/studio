import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { listStatesByProcessId } from "services/resources/processes/list-states";

export function useProcessesPage() {
  const navigate = useNavigate();

  const navigateToHistory = useCallback(
    (processId: string) => {
      navigate(`${processId}/history`);
    },
    [navigate]
  );

  const navigateToDiagram = useCallback(
    async (processId: string) => {
      const response = await listStatesByProcessId(processId);

      navigate(`/dashboard/workflows/${response.workflow_id}/diagram`);
    },
    [navigate]
  );

  return {
    navigateToHistory,
    navigateToDiagram,
  };
}
