import { useState } from "react";

import { Client } from "paho-mqtt";
import { v4 as uuidv4 } from "uuid";
import jwt_decode from "jwt-decode";

import { IPayloadForm } from "pages/settings/types/IPayloadForm";
import { getStorageItem, setStorageItem } from "shared/utils/storage";
import { setBaseUrl } from "services/api";
import { createToken } from "services/resources/token";
import { useSnackbar, VariantType } from "notistack";
import { healthcheck } from "services/resources/settings";
import {
  removeProtocolHttps,
  removeProtocolWs,
  urlHasProtocolHttp,
  urlHasProtocolWs,
} from "./utils/string";

import * as S from "./styles";

export const Settings: React.FC = () => {
  const [isLoadingMqtt, setIsLoadingMqtt] = useState(false);
  const [isLoadingServer, setIsLoadingServer] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const urlServe = process.env.REACT_APP_BASE_URL;
  const portServer = process.env.REACT_APP_URL_PORT;

  function showNotification(message: string, variant: VariantType) {
    enqueueSnackbar(message, {
      autoHideDuration: 4000,
      variant,
    });
  }

  function getUserId() {
    const token = getStorageItem("TOKEN");
    const decoded = jwt_decode(token);
    setStorageItem("TOKEN", token);
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

    setStorageItem("TOKEN", token);
  }
  async function onSubmitServer(payload: IPayloadForm) {
    let url = payload.url;

    try {
      if (urlHasProtocolHttp(url)) {
        url = removeProtocolHttps(url);
      }

      setIsLoadingServer(true);
      await healthcheck(`https://${url}`, payload.port);

      setStorageItem("SERVER_URL", `https://${url}`);
      setBaseUrl(`https://${url}`);
      onHandleToken();

      const message = "Sucesso ao conectar com o servidor";
      showNotification(message, "success");
    } catch (erro: any) {
      showNotification(erro.message, "error");
      console.log(erro);
    } finally {
      setIsLoadingServer(false);
    }
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

      setIsLoadingMqtt(true);

      client.connect({
        timeout: 2,
        onSuccess: () => {
          setStorageItem("MQTT_URL", `${url}:${payload.port}`);
          onHandleToken();

          const message = "Sucesso ao conectar com o servidor";
          showNotification(message, "success");
          setIsLoadingMqtt(false);
        },
        onFailure: () => {
          const message = "Erro ao conectar com o servidor";
          showNotification(message, "error");
          setIsLoadingMqtt(false);
        },
      });

      client.disconnect();
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setIsLoadingMqtt(false);
      }, 5000);
    }
  }
  return (
    <S.Wrapper>
      <S.Title>Configurações</S.Title>

      <S.Form
        labelPort="Porta do servidor"
        labelUrl="URL do servidor do flowbuild"
        defaultUrl={urlServe}
        defaultPort={portServer}
        onSubmit={onSubmitServer}
        isLoading={isLoadingServer}
      />

      <S.Form
        labelPort="Porta do MQTT"
        labelUrl="URL do servidor de MQTT"
        onSubmit={onSubmitMqtt}
        isLoading={isLoadingMqtt}
      />
    </S.Wrapper>
  );
};
