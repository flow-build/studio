import { api } from "services/api/diagrams";

export const getToken = async () => {
  try {
    const response = await api.get("/token");
    return response.data.jwtToken || response.data.token;
  } catch (e: any) {
    throw new Error(`Erro ao requisitar token ${e.error}: ${e.message}`);
  }
};