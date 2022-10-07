import { api } from "services/api/diagrams";

export async function listByWorkflow(id: string) {
  try {
    const { data } = await api.get(`/diagrams/workflow/${id}`);
    return data;
  } catch (error) {
    console.error("Erro ao listar os diagramas por workflow id", error);
  }
}
