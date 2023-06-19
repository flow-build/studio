import { api } from "services/api/diagrams";

export async function listDiagramByWorkflowId(workflowId: string) {
  try {
    const { data } = await api.get(`/workflow/${workflowId}`);
    return data;
  } catch (error) {
    console.error("Erro ao listar os diagramas por workflow id", error);
  }
}
