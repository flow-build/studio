import { IHealthyCheck } from "services/resources/settings/types/IHealthyCheck";

import { api } from "services/api";

export async function healthcheck(): Promise<IHealthyCheck> {
  try {
    const { data } = await api.get(`/healthcheck`);
    return data;
  } catch (error) {
    throw new Error("Erro ");
  }
}
