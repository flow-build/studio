import { apiDiagrams } from "services/api/diagrams";


export const getDiagramToken = async () => {
  try {
    const response = await apiDiagrams.post("/token", {});
    return response.data.jwtToken || response.data.token;
  } catch (e: any) {
    throw new Error(`getDiagramToken -> ${e.error}: ${e.message}`);
  }
};
