import { TProcess } from "models/process";
import { api } from "services/api"

export async function listByProcessId(workflowId: string): Promise<TProcess[]> {
  try {
    const { data } = await api.get(`/workflows/${workflowId}/processes`)
    return data;
  } catch (error) {
    throw new Error("Erro ao listar processo pelo processId")
  }
}