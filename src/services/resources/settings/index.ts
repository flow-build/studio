import { IHealthyCheck } from "services/resources/settings/types/IHealthyCheck";

import { api } from "services/api";

export async function healthcheck(): Promise<IHealthyCheck> {
  try {
    const { data } = await api.get(`/healthcheck`);
    return {
      ...data,
      mqtt: {
        ...data.mqtt,
        status: Boolean(data.mqtt.status),
      },
    };
  } catch (error) {
    throw new Error("Erro ao conectar com o servidor");
  }
}
