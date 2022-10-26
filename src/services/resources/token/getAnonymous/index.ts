import { api } from "services/api";

export const getAnonymousToken = async (userId: string) => {
  try {
    const response = await api.post("/token",{user_id: userId});
    return response.data.jwtToken || response.data.token;
  } catch (error: any) {
    throw new Error(`getWorkflowAnonymousToken -> ${error.error}: ${error.message}`);
  }
};

