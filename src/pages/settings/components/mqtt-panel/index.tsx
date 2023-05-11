import { VariantType, useSnackbar } from "notistack";
import jwtDecode from "jwt-decode";
import { v4 as uuidv4 } from "uuid";
import { Client } from "paho-mqtt";

import {
  removeProtocolWs,
  urlHasProtocolHttp,
  urlHasProtocolWs,
} from "pages/settings/utils/string";
import { IPayloadForm } from "pages/settings/types/IPayloadForm";

import { createToken } from "services/resources/token";

import { LocalStorage } from "shared/utils/base-storage/local-storage";
import { SessionStorage } from "shared/utils/base-storage/session-storage";

import * as S from "./styles";

export const MqttPanel: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();

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

  function showNotification(message: string, variant: VariantType) {
    enqueueSnackbar(message, {
      autoHideDuration: 4000,
      variant,
    });
  }

  function getUserId() {
    const token = SessionStorage.getInstance().getValueByKey<string>("TOKEN");

    if (!token) {
      return "";
    }

    const decoded = jwtDecode(token);
    SessionStorage.getInstance().setValue("TOKEN", token);
    return decoded;
  }

  async function onHandleToken() {
    const userId = getUserId() as string;
    const token = await createToken(userId);

    if (!token) {
      const message = "Erro no retorno do Token. Por favor tentar novamente!";
      showNotification(message, "error");
      return;
    }

    SessionStorage.getInstance().setValue("TOKEN", token);
  }

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

            await onHandleToken();

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
