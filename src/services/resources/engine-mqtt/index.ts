import { api } from "services/api";

export async function healthcheckMqtt({ token }: { token?: string }) {
  try {
    const { data } = await api.post("/cockpit/connection/beacon", { token });
    return data;
  } catch (error) {
    throw new Error("Não foi possível encontrar pelo process ID informado");
  }
}
