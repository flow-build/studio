import { api } from "services/api/diagrams";

export const createToken = async (userId?: string) => {
  try {
    const response = await api.post("/token", { userId });
    return response.data.jwtToken || response.data.token;
  } catch (e: any) {
    throw new Error(`Erro ao requisitar token ${e.error}: ${e.message}`);
  }
};
