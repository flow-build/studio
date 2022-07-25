import { TState } from "models/state";
import { api } from "services/api"



export async function listStateByProcessId(processId: any): Promise<TState> {
  try {
    const { data } = await api.get(`/processes/${processId}/state`)
    return data;
  } catch (error) {
    throw new Error("Erro ao listar processo por Estado")
  }  
}