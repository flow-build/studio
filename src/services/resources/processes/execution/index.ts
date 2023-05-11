import { TState } from "models/state";

import { api } from "services/api";

export async function getExecutionByProcessId(
  processId: string
): Promise<TState> {
  try {
    const { data } = await api.get(`/cockpit/processes/${processId}/execution`);
    return data;
  } catch (error) {
    throw new Error("Erro ao carregar a execução por processId");
  }
}

