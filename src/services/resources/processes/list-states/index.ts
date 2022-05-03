// import { TWorkflow } from "models/workflow";
import { api } from "services/api"

export async function listStatesByProcessId(processId: string)/* : Promise<TWorkflow> */ {
  try {
    const { data } = await api.get(`/processes/${processId}/state`)
    return data;
  } catch (error) {
    throw new Error("Não foi possível encontrar pelo process ID informado")
  }
}