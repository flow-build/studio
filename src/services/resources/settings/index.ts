import { IHealthyCheck } from "services/resources/settings/types/IHealthyCheck";

import axios from "axios";

export async function healthcheck(
  url: string,
  port: string
): Promise<IHealthyCheck> {
  try {
    const { data } = await axios.get(url + `/healthcheck`);

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
