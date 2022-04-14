import { TState } from "models/state";
import { api } from "services/api"

export async function getHistoryByProcessId(processId: string): Promise<TState[]> {
  try {
    const { data } = await api.get(`/processes/${processId}/history`)
    return data;
  } catch (error) {
    throw new Error("Erro ao tentar listar o histórico por processId")
  }
}