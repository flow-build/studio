import { useState } from "react";

import { Client } from "paho-mqtt";
import { v4 as uuidv4 } from "uuid";

import { IPayloadForm } from "pages/settings/types/IPayloadForm";
import { setStorageItem } from "shared/utils/storage";
import { setBaseUrl } from "services/api";
import { getAnonymousToken } from "services/resources/token";
import { useSnackbar, VariantType } from "notistack";
import { healthcheck } from "services/resources/settings";

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

  async function onHandleToken() {
    const token = await getAnonymousToken();

    if (!token) {
      const message = "Erro no retorno do Token. Por favor tentar novamente!";
      showNotification(message, "error");
      return;
    }

    setStorageItem("TOKEN", token);
  }

  async function onSubmitServer(payload: IPayloadForm) {
    try {
      setIsLoadingServer(true);
      await healthcheck(payload.url, payload.port);

      setStorageItem("SERVER_URL", `${payload?.url}:${payload.port}`);
      setBaseUrl(`${payload.url}:${payload.port}`);
      onHandleToken();

      const message = "Sucesso ao conectar com o servidor";
      showNotification(message, "success");
    } catch (erro: any) {
      showNotification(erro.message, "error");
    } finally {
      setIsLoadingServer(false);
    }
  }

  function onSubmitMqtt(payload: IPayloadForm) {
    const id = uuidv4();

    const mqttConfig = {
      host: payload.url,
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
      onSuccess: () => {
        setStorageItem("MQTT_URL", `${payload.url}:${payload.port}`);
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
