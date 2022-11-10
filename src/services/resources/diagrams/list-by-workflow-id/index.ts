import { api } from "services/api/diagrams";

export async function listByWorkflowId(workflowId: string) {
  try {
    const { data } = await api.get(`/diagrams/workflow/${workflowId}`);
    return data;
  } catch (error) {
    console.error("Erro ao listar os diagramas por workflow id", error);
  }
}
