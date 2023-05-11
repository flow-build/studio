import { v4 as uuidv4 } from "uuid";
import { Client } from "paho-mqtt";

import {
  removeProtocolWs,
  urlHasProtocolHttp,
  urlHasProtocolWs,
} from "pages/settings/utils/string";
import { IPayloadForm } from "pages/settings/types/IPayloadForm";

import { LocalStorage } from "shared/utils/base-storage/local-storage";

import * as S from "./styles";
import { useForm } from "pages/settings/hooks/useForm";

export const MqttPanel: React.FC = () => {
  const { onSetToken, showNotification } = useForm();

  const defaultValue = {
    url:
      LocalStorage.getInstance().getValueByKey<string>("MQTT_URL") ??
      process.env.REACT_APP_MQTT_HOST,
    port:
      LocalStorage.getInstance().getValueByKey<string>("MQTT_PORT") ??
      process.env.REACT_APP_MQTT_PORT,
  };

  const inputConfig = {
    url: {
      label: "URL do servidor do MQTT",
      defaultValue: defaultValue.url,
    },
    port: {
      label: "Porta do MQTT",
      defaultValue: defaultValue.port,
    },
  };

  async function onSubmitMqtt(payload: IPayloadForm) {
    const id = uuidv4();
    let url = payload.url;

    try {
      if (urlHasProtocolHttp(url)) {
        const message = "Protocolo incorreto";
        showNotification(message, "error");
        return;
      }

      if (urlHasProtocolWs(url)) {
        url = removeProtocolWs(url);
      }

      const mqttConfig = {
        host: url,
        port: Number(payload?.port),
        clientId: id,
      };

      const client = new Client(
        mqttConfig.host,
        mqttConfig.port,
        mqttConfig.clientId
      );

      return new Promise<void>((resolve, reject) => {
        client.connect({
          timeout: 2,
          onSuccess: async () => {
            const mqttUrl = `${url}:${payload.port}`;
            LocalStorage.getInstance().setValue("MQTT_URL", mqttUrl);
            LocalStorage.getInstance().setValue("MQTT_PORT", payload.port);

            await onSetToken();

            const message = "Sucesso ao conectar com o servidor";
            showNotification(message, "success");
            resolve();
          },
          onFailure: () => {
            const message = "Erro ao conectar com o servidor";
            showNotification(message, "error");
            reject();
          },
        });

        client.disconnect();
      });
    } catch (error) {
      const message = "Erro ao conectar com o servidor";
      showNotification(message, "error");
    }
  }

  return (
    <S.Wrapper>
      <S.Form input={inputConfig} onSubmit={onSubmitMqtt} />
    </S.Wrapper>
  );
};
