import { api } from "services/api/diagrams";

export async function deleteDiagram(id: string) {
  try {
    const { data } = await api.delete(`/diagrams/${id}`);
    return data;
  } catch (error) {
    console.error("Erro ao listar os diagramas por id", error);
  }
}
