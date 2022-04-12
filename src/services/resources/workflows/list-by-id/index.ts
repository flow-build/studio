import { TWorkflow } from "models/workflow";
import { api } from "services/api"

export async function listWorkflowById(workflowId: string): Promise<TWorkflow> {
  try {
    const { data } = await api.get(`/workflows/${workflowId}`)
    return data;
  } catch (error) {
    throw new Error("Erro ao listar workflow por id")
  }
}