import { TProcess } from "models/process";
import { api } from "services/api"

export async function listByProcessId(processId: string): Promise<TProcess[]> {
  try {
    const { data } = await api.get(`/workflows/${processId}/processes`)
    return data;
  } catch (error) {
    throw new Error("Erro ao listar processo pelo processId")
  }
}