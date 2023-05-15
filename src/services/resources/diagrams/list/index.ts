import { api } from "services/api/diagrams";

export async function list() {
  try {
    const { data } = await api.get("/diagram");
    return data;
  } catch (error) {
    console.error("Erro ao listar os diagramas", error);
  }
}
