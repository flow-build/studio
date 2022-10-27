import { api } from "services/api";

export const getAnonymousToken = async (user_id: string) => {
  try {
    const response = await api.post("/token", { user_id });
    return response.data.jwtToken || response.data.token;
  } catch (e: any) {
    throw new Error(`getWorkflowAnonymousToken -> ${e.error}: ${e.message}`);
  }
};

