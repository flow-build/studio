import { TWorkflow } from "models/workflow";
import { api } from "services/api";

export async function getWorkflowByName(
  workflowName: string
): Promise<TWorkflow> {
  try {
    const { data } = await api.get(`/workflows/name/${workflowName}`);
    return data;
  } catch (error) {
    throw new Error("Erro ao listar workflow por id");
  }
}
