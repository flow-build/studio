import { apiNodes } from "services/api";

export async function listNodes() {
  try {
    const data = await apiNodes.get(`/cockpit/nodes`);
    // console.log("data", data);
    return data;
  } catch (error) {
    throw new Error("Erro ao encontrar os nodes");
  }
}

