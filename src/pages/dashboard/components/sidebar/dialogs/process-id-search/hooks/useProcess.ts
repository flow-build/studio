import { validate as uuidValidate } from "uuid";
import { useSnackbar } from "notistack";

import { listStateByProcessId } from "services/resources/state/process-state";

export function useProcess() {
  const { enqueueSnackbar } = useSnackbar();

  async function getCurrentStateById(processId: string) {
    try {
      if (!uuidValidate(processId)) {
        throw new Error("UUID inválido");
      }

      const response = await listStateByProcessId(processId);

      const actualState = {
        currentStatus: (response as any).current_status as any,
        stepNumber: (response as any).state.step_number as any,
        result: (response as any).state.result as any,
        bag: (response as any).state.bag as any,
        environment: (response as any).environment as any,
        workflowId: (response as any).workflow_id as any,
        processId: (response as any).state.process_id as any,
      };

      return actualState;
    } catch (error: any) {
      enqueueSnackbar(error.message, {
        autoHideDuration: 2000,
        variant: "error",
      });
    }
  }

  return {
    getCurrentStateById,
  };
}
