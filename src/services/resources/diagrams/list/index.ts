import { api } from "../../../api/diagrams/index";

export async function list() {
  try {
    const { data } = await api.get("/diagrams");
    return data;
  } catch (error) {
    console.error("Erro ao listar os diagramas", error);
  }
}
