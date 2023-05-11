import { useState } from "react";

import { Client } from "paho-mqtt";
import { v4 as uuidv4 } from "uuid";
import jwt_decode from "jwt-decode";
import sign from "jwt-encode";

import { IPayloadForm } from "pages/settings/types/IPayloadForm";
import { IPayloadDashboardForm } from "./types/IPayloadDashboardForm";
import { setBaseUrl, setDashboardUrl } from "services/api";
import { createToken } from "services/resources/token";
import { useSnackbar, VariantType } from "notistack";
import { healthcheck } from "services/resources/settings";
import {
  removeProtocolWs,
  urlHasProtocolHttp,
  urlHasProtocolWs,
} from "./utils/string";

import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { LocalStorage } from "shared/utils/base-storage/local-storage";
import { SessionStorage } from "shared/utils/base-storage/session-storage";

export const Settings: React.FC = () => {
  const [isLoadingMqtt, setIsLoadingMqtt] = useState(false);
  const [isLoadingServer, setIsLoadingServer] = useState(false);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const urlServe = process.env.REACT_APP_BASE_URL;
  const portServer = process.env.REACT_APP_URL_PORT;

  const urlMetabase = process.env.REACT_APP_METABASE_SITE_URL as string;
  const secretKeyMetabase = process.env.REACT_APP_METABASE_SECRET_KEY as string;
  const dashboardMetabaseNumber = process.env
    .REACT_APP_METABASE_DASHBOARD_NUMBER as string;

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

    const decoded = jwt_decode(token);
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
  async function onSubmitServer(payload: IPayloadForm) {
    let url = payload.url;

    try {
      setIsLoadingServer(true);
      await healthcheck(`${url}`, payload.port);

      LocalStorage.getInstance().setValue("SERVER_URL", url);
      setBaseUrl(`${url}`);
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
          const mqttUrl = `${url}:${payload.port}`;
          LocalStorage.getInstance().setValue("MQTT_URL", mqttUrl);

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

  function onSubmitDashboard(payload: IPayloadDashboardForm) {
    try {
      setIsLoadingDashboard(true);

      const payloadMetabaseUrl = {
        resource: { dashboard: Number(payload.dashboardNumber) },
        params: {},
        exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
      };

      const token = sign(payloadMetabaseUrl, payload.metabaseSecretKey);

      const dashboardUrl = `${payload.metabaseSiteUrl}/embed/dashboard/${token}#theme=night&bordered=true&titled=true`;
      LocalStorage.getInstance().setValue("DASHBOARD", dashboardUrl);

      setDashboardUrl(
        `${payload.metabaseSiteUrl}/embed/dashboard/${token}#theme=night&bordered=true&titled=true`
      );

      onHandleToken();

      const message = "Sucesso ao conectar com o servidor";
      showNotification(message, "success");
      navigate("/dashboard");
    } catch (erro: any) {
      showNotification(erro.message, "error");
    } finally {
      setIsLoadingServer(false);
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

      <S.DashboardForm
        onSubmit={onSubmitDashboard}
        isLoading={isLoadingDashboard}
        defaultMetabaseUrl={urlMetabase}
        defaultSecretKey={secretKeyMetabase}
        defaultDashboardNumber={dashboardMetabaseNumber}
        labelmetabaseSiteUrl="URL Metabase Site"
        labelmetabaseSecretKey="Metabase Secret Key"
        labeldashboardNumber="Dashboard Number"
      />
    </S.Wrapper>
  );
};
