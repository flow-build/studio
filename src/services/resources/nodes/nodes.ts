import { api } from "services/api";

export async function listNodes() {
  try {
    const { data } = await api.get(`/cockpit/nodes`);
    return data;
  } catch (error) {
    throw new Error("Erro ao encontrar os nodes");
  }
}
